/* eslint-disable jsx-a11y/label-has-associated-control */
import classnames from 'classnames';
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import serialize from 'form-serialize';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { ProjectHeader } from '../components/projectHeader';
import { WithAuthentication, RouteType, Role } from '../components/withAuthentication';
import { FileUpload } from '../components/fileUpload';
import { updateHireMeInfo, createHireMeInfo, createDomainSlug, deleteDomainSlug, updateUser } from '../graphql/mutations';
import { CreateHireMeInfoInput, GetHireMeInfoQuery, GetDomainSlugQuery } from '../API';
import { getHireMeInfo, getDomainSlug } from '../graphql/queries';
import { client } from './_app';
import styles from './styles/hireEdit.module.scss';
import { DomainSlug } from '../types/custom';
import { useFlash, useLogger } from '../hooks';

const imageInputNames = ['banner', 'portfolio-1', 'portfolio-2', 'portfolio-3', 'portfolio-4', 'portfolio-5', 'portfolio-6'];

interface ValidationProps {
  domainSlugID?: string;
}

const HirePageEditor = ({ currentUser }) => {
  const router = useRouter();
  const { setFlash, setDelayedFlash } = useFlash();
  const [hireInfo, setHireInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState({});
  const [bannerImage, setBannerImage] = useState(null);
  const [fileInputValues, setFileInputValues] = useState({});
  const { logger } = useLogger();
  const [invalids, setInvalids] = useState<ValidationProps>({});
  const { email, sub: freelancerID } = currentUser.attributes;

  useEffect(() => {
    const execute = async () => {
      const variables = { freelancerID };

      try {
        const res: { data: GetHireMeInfoQuery } = await client.query({
          query: gql(getHireMeInfo),
          variables,
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

        setHireInfo(info);
      } catch (error) {
        setFlash("There was an error retreiving your Hire Page info. We're looking into it.");
        logger.error('HirePageEditor: error retrieving Hire page info', { error, input: variables });
      } finally {
        setLoading(false);
      }
    };
    execute();
  }, []);

  function validate({ domainSlugID }: ValidationProps) {
    const temp: ValidationProps = {};
    if (!domainSlugID) temp.domainSlugID = 'error';
    return temp;
  }

  const handleFileInputChange = (file, inputName) => {
    setFileInputValues({ ...fileInputValues, [inputName]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setInvalids({});
    const formValues = serialize(e.target, { hash: true, empty: true });
    const validation = validate(formValues);

    if (Object.keys(validation).length) {
      setInvalids(validation);
      setSaving(false);
      return;
    }

    const updateUserInput = {
      id: freelancerID,
      name: formValues.name,
    };

    try {
      await client.mutate({
        mutation: gql(updateUser),
        variables: { input: updateUserInput },
      });
    } catch (error) {
      logger.error('HirePageEditor: error updating User.', { error, input: updateUserInput });
    }

    const domainSlugID = formValues.domainSlugID.split('continuum.works/hire/', 2)[1];
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
    for (const name of imageInputNames) {
      const file = fileInputValues[name];
      const existingImage = hireInfo?.portfolioImages?.find((img) => name === img.tag);

      if (file) {
        if (existingImage) {
          const { key } = existingImage;
          try {
            Storage.remove(key);
          } catch (error) {
            logger.error('HirePageEditor: error deleting image from s3', { error, input: key });
          }
        }

        if (hireInfo?.bannerImage && name === 'banner') {
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

        if (name === 'banner') {
          formValues.bannerImage = { key: s3Key, tag: name };
        } else {
          portfolioImageS3Objects.push({ key: s3Key, tag: name });
        }
      } else if (existingImage) {
        // if the existing image is the banner image, just leave the DB and S3 as is
        if (name !== 'banner') {
          portfolioImageS3Objects.push({ key: existingImage.key, tag: existingImage.tag });
        }
      }
    }

    (formValues as CreateHireMeInfoInput).portfolioImages = portfolioImageS3Objects;

    const mutateHireMeInfoInput = {
      freelancerID,
      email,
      ...formValues,
    };

    try {
      const mutationResult = await client.mutate({
        mutation: hireInfo ? gql(updateHireMeInfo) : gql(createHireMeInfo),
        variables: { input: mutateHireMeInfoInput },
      });

      const info = hireInfo ? mutationResult?.data?.updateHireMeInfo : mutationResult?.data?.createHireMeInfo;

      setHireInfo(info);
      setFileInputValues({});

      Promise.all(uploadPromises)
        .then(() => {
          setDelayedFlash('Your changes have been saved');
          const slug = info?.domainSlug?.slug;
          if (slug) {
            router.push('/hire/[id]', `/hire/${slug}`, { shallow: true }).then(() => window.scrollTo(0, 0));
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

  if (loading) return null;

  return (
    <div className={styles.hirePageEditor}>
      <ProjectHeader headerText="Hire Page Editor" />
      <div className="container is-desktop">
        <main className={styles.main}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={classnames('text-1', 'columns')}>
              <div className="column">
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input name="name" className="input" type="text" maxLength={48} size={35} defaultValue={hireInfo?.name} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input name="title" className="input" type="text" maxLength={32} size={35} defaultValue={hireInfo?.title} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Button Text</label>
                  <div className="control">
                    <input
                      name="buttonText"
                      className="input"
                      type="text"
                      maxLength={24}
                      defaultValue={hireInfo?.buttonText}
                      placeholder="Start a Conversation"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Blurb</label>
                  <div className="control">
                    <textarea name="blurbText" maxLength={255} rows={3} className="textarea" defaultValue={hireInfo?.blurbText} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">About</label>
                  <div className="control">
                    <textarea name="aboutText" maxLength={1000} rows={7} className="textarea" defaultValue={hireInfo?.aboutText} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Twitter URL</label>
                  <div className="control">
                    <input
                      name="twitterUrl"
                      className="input"
                      type="url"
                      pattern="https?://.+"
                      maxLength={75}
                      size={35}
                      defaultValue={hireInfo?.twitterUrl}
                      placeholder="https://twitter.com/"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Dribbble URL</label>
                  <div className="control">
                    <input
                      name="dribbbleUrl"
                      className="input"
                      type="url"
                      pattern="https?://.+"
                      maxLength={75}
                      size={35}
                      defaultValue={hireInfo?.dribbbleUrl}
                      placeholder="https://dribbble.com/"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Instagram URL</label>
                  <div className="control">
                    <input
                      name="instagramUrl"
                      className="input"
                      type="url"
                      pattern="https?://.+"
                      maxLength={75}
                      size={35}
                      defaultValue={hireInfo?.instagramUrl}
                      placeholder="https://www.instagram.com/"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">LinkedIn URL</label>
                  <div className="control">
                    <input
                      name="linkedInUrl"
                      className="input"
                      type="url"
                      pattern="https?://.+"
                      maxLength={75}
                      size={35}
                      defaultValue={hireInfo?.linkedInUrl}
                      placeholder="https://www.linkedin.com/in/"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Built-in Domain e.g. continuum.works/hire/xyz</label>
                  <div className="control">
                    <input
                      name="domainSlugID"
                      className={classnames('input', { 'is-danger': invalids.domainSlugID })}
                      type="text"
                      pattern="^continuum.works/hire/[A-Za-z0-9]+"
                      maxLength={50}
                      size={35}
                      defaultValue={`continuum.works/hire/${hireInfo?.domainSlug?.slug || ''}`}
                    />
                  </div>
                </div>
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
            <div className={styles.save}>
              <button
                disabled={saving}
                type="submit"
                className={classnames('oval-btn-2', 'oval-btn-2--inline', 'button', { 'is-loading': saving })}
              >
                SAVE
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default WithAuthentication(HirePageEditor, { routeType: RouteType.SIGNED_IN, allowedRoles: [Role.FREELANCER] });
