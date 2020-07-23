/* eslint-disable jsx-a11y/label-has-associated-control */
import classnames from 'classnames';
import { Storage } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { ProjectHeader } from '../../components/projectHeader';
import { WithAuthentication, RouteType, Role } from '../../components/withAuthentication';
import { FileUpload } from '../../components/fileUpload';
import { updateHireMeInfo, createHireMeInfo } from '../../graphql/mutations';
import { CreateHireMeInfoInput } from '../../API';
import { GetHireMeInfoQuery } from '../../API';
import { getHireMeInfo } from '../../graphql/queries';
import { client } from '../_app';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import styles from '../styles/hireEdit.module.scss';
import serialize from 'form-serialize';
import gql from 'graphql-tag';

const imageInputNames = [
  'banner', 'portfolio-1', 'portfolio-2', 'portfolio-3', 'portfolio-4', 'portfolio-5', 'portfolio-6',
];

const HirePageEditor = ({ currentUser }) => {
  const [hireInfo, setHireInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [portfolioImages, setPortfolioImages] = useState({});
  const [bannerImage, setBannerImage] = useState(null);
  const [fileInputValues, setFileInputValues] = useState({});
  const freelancerID = currentUser.cognitoUser.username;

  useEffect(() => {
    const execute = async () => {

      try {
        const res: {data: GetHireMeInfoQuery} = await client.query({
          query: gql(getHireMeInfo),
          variables: { freelancerID },
        });

        const info = res.data.getHireMeInfo;

        if (info) {
          info.portfolioImages?.forEach(({ key, tag }) => {
            try {
              Storage.get(key).then((img) => setPortfolioImages({ ...portfolioImages, [tag]: img }));
            } catch (err) {
              console.log(err);
            }
          });

          if (info.bannerImage) {
            try {
              Storage.get(info.bannerImage.key).then((b) => setBannerImage(b));
            } catch (err) {
              console.log(err);
            }
          }
        }

        setHireInfo(info);
      } catch (err) {
        setError("There was an error retreiving your Hire Page info. Please contact support");
      } finally {
        setLoading(false);
      }
    };
    execute();
  }, []);

  const handleFileInputChange = (file, inputName) => {
    setFileInputValues({ ...fileInputValues, [inputName]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const variables = serialize(e.target, { hash: true, empty: true });
    const portfolioImageS3Objects = [];
    const uploadPromises = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const name of imageInputNames) {
      const file = fileInputValues[name];
      const existingImage = hireInfo?.portfolioImages?.find((img) => name === img.tag);

      if (file) {
        if (existingImage) {
          Storage.remove(existingImage.key);
        }

        if (hireInfo?.bannerImage && name === 'banner') {
          Storage.remove(hireInfo.bannerImage.key);
        }

        const s3Key = `${uuid()}${file.name}`;
        uploadPromises.push(Storage.put(s3Key, file));

        if (name === 'banner') {
          variables.bannerImage = { key: s3Key, tag: name };
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

    (variables as CreateHireMeInfoInput).portfolioImages = portfolioImageS3Objects;

    try {
      const mutationResult = await client.mutate({
        mutation: hireInfo ? gql(updateHireMeInfo) : gql(createHireMeInfo),
        variables: {
          input: {
            freelancerID: hireInfo ? hireInfo.freelancerID : freelancerID,
            ...variables,
          },
        },
      });

      const info = hireInfo ? mutationResult?.data?.updateHireMeInfo : mutationResult?.data?.createHireMeInfo;
      setHireInfo(info);
      setFileInputValues({});

      Promise.all(uploadPromises).then(() => {
        setError('Your changes have been saved');
      }).catch(() => {
        setError('Some images may not have saved. Refresh the page to see.');
      }).finally(() => {
        setSaving(false);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
    } catch (err) {
      console.log(err)
      setError("There was an error updating your Hire Page info. Please contact support.");
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  console.log(process.env.XXX)

  return (
    <div>
      <div className="flash-message">{error}</div>
      <div className="container is-desktop">
        <ProjectHeader headerText="Hire Page Editor" avatar={gravatarUrl(currentUser.cognitoUser.attributes.email)} />
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
                    <textarea name="aboutText" maxLength={1000} rows={18} className="textarea" defaultValue={hireInfo?.aboutText} />
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="flex">
                  <FileUpload
                    name="banner"
                    helpText="Banner Image (1600px x 640px - will be anchored left)"
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
