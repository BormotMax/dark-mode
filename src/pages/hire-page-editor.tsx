/* eslint-disable jsx-a11y/label-has-associated-control */
import classnames from 'classnames';
import Storage from '@aws-amplify/storage';
import { v4 as uuid } from 'uuid';
import React, { useEffect, useState, useCallback } from 'react';
import serialize from 'form-serialize';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import { WithAuthentication, RouteType, Role } from '../components/withAuthentication';
import { FileUpload } from '../components/fileUpload';
import { updateHireMeInfo, createHireMeInfo, createDomainSlug, deleteDomainSlug, updateUser } from '../graphql/mutations';
import { CreateHireMeInfoInput, GetHireMeInfoQuery, GetDomainSlugQuery, GetUserQuery } from '../API';
import { getHireMeInfo, getDomainSlug, getUser } from '../graphql/queries';
import { DomainSlug, ReservedRouteNames, Page } from '../types/custom';
import { useFlash, useLogger } from '../hooks';
import PageLayout from '../components/pageLayout';
import { ButtonSmall } from '../components/buttons/buttons';

import { client } from './_app';
import styles from './styles/hireEdit.module.scss';

const imageInputNames = ['banner', 'portfolio-1', 'portfolio-2', 'portfolio-3', 'portfolio-4', 'portfolio-5', 'portfolio-6'];
const SLUG_PREFIX = 'continuum.works/';

interface ValidationProps {
  domainSlugID?: string;
}

const HirePageEditor = ({ currentUser }) => {
  const router = useRouter();
  const { setFlash, setDelayedFlash } = useFlash();
  const [hireInfo, setHireInfo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState({});
  const [bannerImage, setBannerImage] = useState(null);
  const [fileInputValues, setFileInputValues] = useState({});
  const { logger } = useLogger();
  const [invalids, setInvalids] = useState<ValidationProps>({});

  const [valuesFields, setValuesFields] = useState<Record<string, any>>({
    aboutText: '',
    blurbText: '',
    buttonText: '',
    domainSlugID: '',
    dribbbleUrl: '',
    instagramUrl: '',
    linkedInUrl: '',
    twitterUrl: '',
    name: '',
    title: '',
  });
  const { sub: freelancerID } = currentUser.attributes;

  const onChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { target: { name, value } = {} } = event;
    if (name === 'domainSlugID') {
      setValuesFields((prevState) => ({
        ...prevState,
        [name]: `${value.substr(SLUG_PREFIX.length)}`,
      }));
      return;
    }
    setValuesFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, [setValuesFields]);

  useEffect(() => {
    const execute = async () => {
      const getUserInput = { id: freelancerID };

      let inputsData = {};
      // getUser
      try {
        const res: { data: GetUserQuery } = await client.query({
          query: gql(getUser),
          variables: getUserInput,
        });

        inputsData = {
          name: res?.data?.getUser?.name ?? '',
          title: res?.data?.getUser?.title ?? '',
        };
      } catch (error) {
        setFlash("There was an error retreiving your user info. We're looking into it.");
        logger.error('HirePageEditor: error retrieving User info', { error, input: getUserInput });
      }

      // get hireMeInfo
      const getHireMeInfoInput = { freelancerID };
      try {
        const res: { data: GetHireMeInfoQuery } = await client.query({
          query: gql(getHireMeInfo),
          variables: getHireMeInfoInput,
        });

        const info = res.data.getHireMeInfo;

        if (info) {
          info.portfolioImages?.forEach(({ key, tag }) => {
            try {
              Storage.get(key).then((img) => setPortfolioImages({ ...portfolioImages, [tag]: img }));
            } catch (error) {
              logger.error('HirePageEditor: error retrieving s3 image.', { error, input: key });
            }
          });

          if (info.bannerImage) {
            const { key } = info.bannerImage;
            try {
              Storage.get(key).then((b) => setBannerImage(b));
            } catch (error) {
              logger.error('HirePageEditor: error retrieving s3 image.', { error, input: key });
            }
          }
        }

        setValuesFields((prevState) => ({
          ...prevState,
          ...inputsData,
          aboutText: info?.aboutText || '',
          blurbText: info?.blurbText || '',
          buttonText: info?.buttonText || '',
          domainSlugID: info?.domainSlugID || '',
          dribbbleUrl: info?.dribbbleUrl || '',
          instagramUrl: info?.instagramUrl || '',
          linkedInUrl: info?.linkedInUrl || '',
          twitterUrl: info?.twitterUrl || '',
        }));
        setHireInfo(info);
      } catch (error) {
        setFlash("There was an error retreiving your Hire Page info. We're looking into it.");
        logger.error('HirePageEditor: error retrieving Hire page info', { error, input: getHireMeInfoInput });
      }
    };
    execute();
  }, []);

  function validate() {
    const temp: ValidationProps = {};
    const re = /^[a-z0-9-]+$/;
    if (!valuesFields.domainSlugID?.match(re)) temp.domainSlugID = 'error';
    return temp;
  }

  const handleFileInputChange = (file, inputName) => {
    setFileInputValues((prevState) => ({ ...prevState, [inputName]: file }));
  };

  const updateUserRequest = async () => {
    const updateUserInput = {
      id: freelancerID,
      name: valuesFields.name.trim(),
      title: valuesFields.title.trim(),
    };

    try {
      await client.mutate({
        mutation: gql(updateUser),
        variables: { input: updateUserInput },
      });
    } catch (error) {
      logger.error('HirePageEditor: error updating User.', { error, input: updateUserInput });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setInvalids({});
    const { domainSlugID } = valuesFields;
    const valuesReservedRouteNames = Object.values(ReservedRouteNames);
    if (valuesReservedRouteNames.includes(domainSlugID)) {
      setFlash('That domain is unavailable');
      setSaving(false);
      return;
    }
    const allFormValues = serialize(e.target, { hash: true, empty: true });
    const validation = validate();
    const { name, title, ...formValues } = allFormValues;

    if (Object.keys(validation).length) {
      setInvalids(validation);
      setSaving(false);
      return;
    }

    updateUserRequest();

    formValues.domainSlugID = domainSlugID;
    let domainSlugExists = false;
    let domainSlugIsMine = false;

    // try to get existing DomainSlug
    const getDomainSlugInput = { slug: formValues.domainSlugID };
    try {
      const getDomainSlugResult: { data: GetDomainSlugQuery } = await client.query({
        query: gql(getDomainSlug),
        variables: getDomainSlugInput,
      });

      const getDomainSlugResponse: DomainSlug = getDomainSlugResult?.data?.getDomainSlug;
      const domainSlugOwnerID = getDomainSlugResponse?.freelancerID;
      if (domainSlugOwnerID) {
        domainSlugExists = true;
        domainSlugIsMine = domainSlugOwnerID === freelancerID;
      }

      if (domainSlugExists && !domainSlugIsMine) {
        setFlash('That domain is unavailable');
        setSaving(false);
        return;
      }
    } catch (error) {
      setFlash("Something went wrong. We're looking into it");
      logger.error('HirePageEditor: error retrieving existing slug.', { error, input: getDomainSlugInput });
      setSaving(false);
      return;
    }

    // Create a new DomainSlug
    if (!domainSlugExists) {
      const createDomainSlugInput = {
        freelancerID,
        slug: formValues.domainSlugID,
      };

      try {
        const createDomainSlugResponse = await client.mutate({
          mutation: gql(createDomainSlug),
          variables: { input: createDomainSlugInput },
        });

        const newSlug = createDomainSlugResponse?.data?.createDomainSlug?.slug;
        if (!newSlug) {
          throw new Error();
        }
      } catch (error) {
        setFlash("Something went wrong. We're looking into it");
        logger.error('HirePageEditor: error creating slug.', { error, createDomainSlugInput });
        setSaving(false);
        return;
      }

      // If this freelancer already had a domain slug and just created a new one, delete the existing one
      const existingDomainSlug = hireInfo?.domainSlug?.slug;
      if (existingDomainSlug) {
        const deleteDomainSlugInput = { slug: existingDomainSlug };
        try {
          await client.mutate({
            mutation: gql(deleteDomainSlug),
            variables: { input: deleteDomainSlugInput },
          });
        } catch (error) {
          logger.error('HirePageEditor: deleting old domain slug failed', { error, input: deleteDomainSlugInput });
        }
      }
    }

    const portfolioImageS3Objects = [];
    const uploadPromises = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const imageInputName of imageInputNames) {
      const file = fileInputValues[imageInputName];
      const existingImage = hireInfo?.portfolioImages?.find((img) => imageInputName === img.tag);

      if (file) {
        if (existingImage) {
          const { key } = existingImage;
          try {
            Storage.remove(key);
          } catch (error) {
            logger.error('HirePageEditor: error deleting image from s3', { error, input: key });
          }
        }

        if (hireInfo?.bannerImage && imageInputName === 'banner') {
          const { key } = hireInfo.bannerImage;
          try {
            Storage.remove(key);
          } catch (error) {
            logger.error('HirePageEditor: error deleting banner image from s3', { error, input: key });
          }
        }

        const s3Key = `${uuid()}${file.name}`;

        try {
          uploadPromises.push(Storage.put(s3Key, file));
        } catch (error) {
          logger.error('HirePageEditor: error adding image to s3', { error, input: s3Key });
        }

        if (imageInputName === 'banner') {
          formValues.bannerImage = { key: s3Key, tag: imageInputName };
        } else {
          portfolioImageS3Objects.push({ key: s3Key, tag: imageInputName });
        }
      } else if (existingImage) {
        // if the existing image is the banner image, just leave the DB and S3 as is
        if (imageInputName !== 'banner') {
          portfolioImageS3Objects.push({ key: existingImage.key, tag: existingImage.tag });
        }
      }
    }

    (formValues as CreateHireMeInfoInput).portfolioImages = portfolioImageS3Objects;

    const { name: removedName, title: removedTitle, ...restFormValues } = valuesFields;
    const mutateHireMeInfoInput = {
      freelancerID,
      ...formValues,
      ...restFormValues,
      domainSlugID,
    };

    try {
      const mutationResult = await client.mutate({
        mutation: hireInfo ? gql(updateHireMeInfo) : gql(createHireMeInfo),
        variables: { input: mutateHireMeInfoInput },
      });

      const info = hireInfo ? mutationResult?.data?.updateHireMeInfo : mutationResult?.data?.createHireMeInfo;

      setHireInfo(info);
      setValuesFields((prevState) => ({
        ...prevState,
        aboutText: info?.aboutText || '',
        blurbText: info?.blurbText || '',
        buttonText: info?.buttonText || '',
        domainSlugID: info?.domainSlugID || '',
        dribbbleUrl: info?.dribbbleUrl || '',
        instagramUrl: info?.instagramUrl || '',
        linkedInUrl: info?.linkedInUrl || '',
        twitterUrl: info?.twitterUrl || '',
      }));
      setFileInputValues({});

      Promise.all(uploadPromises)
        .then(() => {
          setDelayedFlash('Your changes have been saved');
          const slug = info?.domainSlug?.slug;
          if (slug) {
            router.push('/[id]', `/${slug}`, { shallow: true }).then(() => window.scrollTo(0, 0));
          } else {
            setFlash("Something went wrong. We're looking into it");
            logger.error('HirePageEditor: After saving, there is no domain slug', { info: { hireInfoId: info.id } });
            setSaving(false);
          }
        })
        .catch((error) => {
          setFlash('Some images may not have saved. Refresh the page to check.');
          logger.error('HirePageEditor: images not saved.', { error });
          setSaving(false);
        });
    } catch (error) {
      setFlash("Something went wrong. We're looking into it");
      logger.error('HirePageEditor: update or create HireMeInfo failed', { error, input: mutateHireMeInfoInput });
      setSaving(false);
    }
  };

  return (
    <PageLayout page={Page.HIRE_EDITOR}>
      <div className={classnames(styles.hirePageEditor, 'column', 'container')}>
        <div className={classnames(styles.saveButtonWrapper, 'is-hidden-mobile')}>
          <ButtonSmall form="hirePageForm" text="Save" isSaving={saving} />
        </div>
        <div className={classnames('text-1', 'columns')}>
          <div className="column">
            <form id="hirePageForm" onSubmit={(e) => handleSubmit(e)}>
              <div className="field">
                <label className="label">Name</label>
                <div className={classnames(styles.halfWidthControl, 'control')}>
                  <input
                    name="name"
                    value={valuesFields.name}
                    onChange={onChangeInput}
                    className="input"
                    type="text"
                    maxLength={48}
                    size={35}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Title</label>
                <div className={classnames(styles.halfWidthControl, 'control')}>
                  <input
                    name="title"
                    value={valuesFields.title}
                    onChange={onChangeInput}
                    className="input"
                    type="text"
                    maxLength={32}
                    size={35}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Button Text</label>
                <div className={classnames(styles.halfWidthControl, 'control')}>
                  <input
                    name="buttonText"
                    value={valuesFields.buttonText}
                    onChange={onChangeInput}
                    className="input"
                    type="text"
                    maxLength={24}
                    placeholder="Start a Conversation"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Blurb</label>
                <div className="control">
                  <textarea
                    name="blurbText"
                    value={valuesFields.blurbText}
                    onChange={onChangeInput}
                    maxLength={255}
                    rows={3}
                    className="textarea"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">About</label>
                <div className="control">
                  <textarea
                    name="aboutText"
                    value={valuesFields.aboutText}
                    onChange={onChangeInput}
                    maxLength={1000}
                    rows={7}
                    className="textarea"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Twitter URL</label>
                <div className={classnames(styles.halfWidthControl, 'control')}>
                  <input
                    name="twitterUrl"
                    value={valuesFields.twitterUrl}
                    onChange={onChangeInput}
                    className="input"
                    type="url"
                    pattern="https?://.+"
                    maxLength={75}
                    size={35}
                    placeholder="https://twitter.com/"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Dribbble URL</label>
                <div className={classnames(styles.halfWidthControl, 'control')}>
                  <input
                    name="dribbbleUrl"
                    value={valuesFields.dribbbleUrl}
                    onChange={onChangeInput}
                    className="input"
                    type="url"
                    pattern="https?://.+"
                    maxLength={75}
                    size={35}
                    placeholder="https://dribbble.com/"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Instagram URL</label>
                <div className={classnames(styles.halfWidthControl, 'control')}>
                  <input
                    name="instagramUrl"
                    value={valuesFields.instagramUrl}
                    onChange={onChangeInput}
                    className="input"
                    type="url"
                    pattern="https?://.+"
                    maxLength={75}
                    size={35}
                    placeholder="https://www.instagram.com/"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">LinkedIn URL</label>
                <div className={classnames(styles.halfWidthControl, 'control')}>
                  <input
                    name="linkedInUrl"
                    value={valuesFields.linkedInUrl}
                    onChange={onChangeInput}
                    className="input"
                    type="url"
                    pattern="https?://.+"
                    maxLength={75}
                    size={35}
                    placeholder="https://www.linkedin.com/in/"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Built-in Domain e.g. continuum.works/xyz</label>
                <div className={classnames(styles.halfWidthControl, 'control')}>
                  <input
                    name="domainSlugID"
                    value={`${SLUG_PREFIX}${valuesFields?.domainSlugID || ''}`}
                    onChange={onChangeInput}
                    className={classnames('input', { 'is-danger': invalids.domainSlugID })}
                    type="text"
                    maxLength={50}
                    size={35}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="column">
            <div className="flex">
              <FileUpload
                name="banner"
                helpText="Banner Image (1100px x 640px)"
                image={bannerImage}
                onChange={(file) => handleFileInputChange(file, 'banner')}
                aspect="wide"
              />
            </div>
            <div className={styles.portfolioContainer}>
              <FileUpload
                name="portfolio-1"
                helpText="Slide 1 (1000px square)"
                image={portfolioImages['portfolio-1']}
                onChange={(file) => handleFileInputChange(file, 'portfolio-1')}
              />
              <FileUpload
                name="portfolio-2"
                helpText="Slide 2 (1000px square)"
                image={portfolioImages['portfolio-2']}
                onChange={(file) => handleFileInputChange(file, 'portfolio-2')}
              />

              <FileUpload
                name="portfolio-3"
                helpText="Slide 3 (1000px square)"
                image={portfolioImages['portfolio-3']}
                onChange={(file) => handleFileInputChange(file, 'portfolio-3')}
              />
              <FileUpload
                name="portfolio-4"
                helpText="Slide 4 (1000px square)"
                image={portfolioImages['portfolio-4']}
                onChange={(file) => handleFileInputChange(file, 'portfolio-4')}
              />

              <FileUpload
                name="portfolio-5"
                helpText="Slide 5 (1000px square)"
                image={portfolioImages['portfolio-5']}
                onChange={(file) => handleFileInputChange(file, 'portfolio-5')}
              />
              <FileUpload
                name="portfolio-6"
                helpText="Slide 6 (1000px square)"
                image={portfolioImages['portfolio-6']}
                onChange={(file) => handleFileInputChange(file, 'portfolio-6')}
              />
            </div>
          </div>
        </div>
        <div className={classnames(styles.save, 'is-hidden-tablet')}>
          <button
            form="hirePageForm"
            disabled={saving}
            onClick={() => null}
            type="submit"
            className={classnames('btn-large', 'btn-large--inline', 'button', { 'is-loading': saving })}
          >
            SAVE
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default WithAuthentication(HirePageEditor, { routeType: RouteType.SIGNED_IN, allowedRoles: [Role.FREELANCER] });
