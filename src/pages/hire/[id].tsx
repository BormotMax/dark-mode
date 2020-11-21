import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { Storage } from 'aws-amplify';
import Carousel, { Modal as ImageModal, ModalGateway } from 'react-images';

import { HireInfoByDomainSlugQuery } from '../../API';
import { hireInfoByDomainSlug } from '../../graphql/queries';
import { HireMeModal } from '../../components/hireMeModal';
import { Modal } from '../../components/modal';
import { useCurrentUser, useFlash, useLogger } from '../../hooks';
import { unauthClient as client } from '../_app';
import LinkedInLogo from '../../img/linkedIn.svg';
import InstagramLogo from '../../img/instagram.svg';
import Dribbble from '../../img/dribbble.svg';
import Sprocket from '../../img/sprocket.svg';
import Twitter from '../../img/twitter.svg';

import styles from '../styles/hire.module.scss';
import { Header } from '../../components/header';
import { Page } from '../../components/nav/nav';
import { ButtonSmall } from '../../components/buttons/buttons';
import { isClickOrEnter } from '../../helpers/util';

enum Tab {
  PORTFOLIO,
  ABOUT,
}

const Hire: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { setFlash } = useFlash();
  const { id } = router.query;
  const [selectedTab, setSelectedTab] = useState(Tab.PORTFOLIO);
  const [hireInfo, setHireInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portfolioImages, setPortfolioImages] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCarouselOpen, setCarouselOpen] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);
  const blurbTextElement = useRef(null);
  const { logger } = useLogger();

  useEffect(() => {
    const execute = async () => {
      if (!id) return;

      const hireInfoByDomainSlugInput = { domainSlugID: id };
      try {
        const { data }: { data: HireInfoByDomainSlugQuery } = await client.query({
          query: gql(hireInfoByDomainSlug),
          variables: hireInfoByDomainSlugInput,
        });

        if (data?.hireInfoByDomainSlug?.items?.length > 1) {
          logger.error('Hire: freelancer has more than one HireInfo', { input: hireInfoByDomainSlugInput });
        }

        const info = data?.hireInfoByDomainSlug?.items[0];

        if (info) {
          const map = {};
          const promises = [];

          info.portfolioImages?.forEach(({ key, tag }) => {
            try {
              promises.push(
                Storage.get(key).then((img) => {
                  map[tag] = img;
                }),
              );
            } catch (error) {
              logger.error('Hire: error getting banner image', { error, input: key });
            }
          });

          Promise.all(promises).then(() => setPortfolioImages(map));

          if (info.bannerImage) {
            const s3Key = info.bannerImage.key;
            try {
              Storage.get(s3Key).then((b) => setBannerImage(b));
            } catch (error) {
              logger.error('Hire: error getting banner image', { error, input: s3Key });
            }
          }
        }

        setHireInfo(info);
      } catch (error) {
        setFlash('There has been an error. Please contact support');
        logger.error('Hire: error getting hireInfoByDomainSlug', { error, input: hireInfoByDomainSlugInput });
      } finally {
        setLoading(false);
      }
    };
    execute();
  }, [id]);

  const goToEditHirePage = () => {
    setIsSaving(true);
    router.push('/hire-page-editor');
  };

  const carouselImages = Object.values(portfolioImages || {}).map((image) => ({ source: image as string }));

  const toggleCarousel = (url: string) => {
    setCurrentCarouselIndex(carouselImages.findIndex((el) => el.source === url));
    setCarouselOpen(!isCarouselOpen);
  };

  const handleSetSelectedTab = (e, tab) => {
    if (isClickOrEnter(e)) {
      setSelectedTab(tab);
    }
  };

  const handleToggleCarousel = (e, img) => {
    if (isClickOrEnter(e)) {
      toggleCarousel(img);
    }
  };

  if (!loading && !hireInfo) return <div>There is no hire page here, yet.</div>;
  if (!hireInfo) return <div>Loading...</div>;

  return (
    <div className={classnames(styles.hire)}>
      <Modal handleClose={() => setModalOpen(false)} isOpen={isModalOpen}>
        <HireMeModal
          freelancerEmail={hireInfo.freelancer.email}
          handleClose={() => setModalOpen(false)}
          freelancerName={hireInfo.freelancer.name}
          freelancerID={hireInfo.freelancerID}
        />
      </Modal>
      <ModalGateway>
        {isCarouselOpen && currentCarouselIndex !== -1 && (
          <ImageModal onClose={() => toggleCarousel(null)}>
            <Carousel views={carouselImages} currentIndex={currentCarouselIndex} />
          </ImageModal>
        )}
      </ModalGateway>
      <SkeletonTheme color="#FAF8F7" highlightColor="white">
        {currentUser?.attributes?.sub === hireInfo.freelancerID && (
        <Header headerText="Hire Page preview" page={Page.HIRE}>
          <ButtonSmall inverted onClick={goToEditHirePage} text="Edit" isSaving={isSaving} />
        </Header>)}
        <div className={classnames(styles.upper)}>
          <div className={styles.bannerImage__mobile}>
            {!hireInfo.bannerImage && null}
            {hireInfo.bannerImage
              && (!bannerImage ? (
                <Skeleton height={640} width={1100} />
              ) : (
                <img alt="banner" className={classnames(styles.bannerImage)} src={bannerImage} />
              ))}
          </div>
          <div className={classnames(styles.leftContainer)}>
            <div className={classnames('text-small-caps', styles.name)}>{hireInfo.freelancer.name}</div>
            <div className={classnames(styles.title, 'h1')}>{hireInfo.freelancer.title}</div>
            <div ref={blurbTextElement} className={styles.blurbText}>
              {hireInfo.blurbText}
            </div>
            {!loading && hireInfo.buttonText && (
              <div className="tar">
                <button onClick={() => setModalOpen(true)} className={styles.button} type="button">
                  {hireInfo.buttonText}
                </button>
              </div>
            )}
          </div>
          <div className={styles.bannerImage__desktop}>
            {!hireInfo.bannerImage && null}
            {hireInfo.bannerImage
              && (!bannerImage ? (
                <Skeleton height={640} width={1100} />
              ) : (
                <img alt="banner" className={classnames(styles.bannerImage)} src={bannerImage} />
              ))}
          </div>
        </div>
        <div className={classnames(styles.lower, 'container', 'is-fullhd')}>
          <div className={classnames('text-small-caps', styles.optionsBar)}>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={(e) => handleSetSelectedTab(e, Tab.PORTFOLIO)}
              onClick={(e) => handleSetSelectedTab(e, Tab.PORTFOLIO)}
              className={classnames(styles.reset, { [styles.selected]: selectedTab === Tab.PORTFOLIO })}
            >
              Portfolio
            </div>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={(e) => handleSetSelectedTab(e, Tab.ABOUT)}
              onClick={(e) => handleSetSelectedTab(e, Tab.ABOUT)}
              className={classnames(styles.reset, { [styles.selected]: selectedTab === Tab.ABOUT }, 'mlxl')}
            >
              About
            </div>
          </div>
          {selectedTab === Tab.PORTFOLIO && (
            <div className={styles.portfolioImages}>
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                portfolioImages['portfolio-1'] && (
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => handleToggleCarousel(e, portfolioImages['portfolio-1'])}
                    onClick={(e) => handleToggleCarousel(e, portfolioImages['portfolio-1'])}
                    className={styles.portfolioImage}
                  >
                    <img src={portfolioImages['portfolio-1']} alt="portfolio" />
                  </div>
                )
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                portfolioImages['portfolio-2'] && (
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => handleToggleCarousel(e, portfolioImages['portfolio-2'])}
                    onClick={(e) => handleToggleCarousel(e, portfolioImages['portfolio-2'])}
                    className={styles.portfolioImage}
                  >
                    <img src={portfolioImages['portfolio-2']} alt="portfolio" />
                  </div>
                )
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                portfolioImages['portfolio-3'] && (
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => handleToggleCarousel(e, portfolioImages['portfolio-3'])}
                    onClick={(e) => handleToggleCarousel(e, portfolioImages['portfolio-3'])}
                    className={styles.portfolioImage}
                  >
                    <img src={portfolioImages['portfolio-3']} alt="portfolio" />
                  </div>
                )
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                portfolioImages['portfolio-4'] && (
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => handleToggleCarousel(e, portfolioImages['portfolio-4'])}
                    onClick={(e) => handleToggleCarousel(e, portfolioImages['portfolio-4'])}
                    className={styles.portfolioImage}
                  >
                    <img src={portfolioImages['portfolio-4']} alt="portfolio" />
                  </div>
                )
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                portfolioImages['portfolio-5'] && (
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => handleToggleCarousel(e, portfolioImages['portfolio-5'])}
                    onClick={(e) => handleToggleCarousel(e, portfolioImages['portfolio-5'])}
                    className={styles.portfolioImage}
                  >
                    <img src={portfolioImages['portfolio-5']} alt="portfolio" />
                  </div>
                )
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                portfolioImages['portfolio-6'] && (
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => handleToggleCarousel(e, portfolioImages['portfolio-6'])}
                    onClick={(e) => handleToggleCarousel(e, portfolioImages['portfolio-6'])}
                    className={styles.portfolioImage}
                  >
                    <img src={portfolioImages['portfolio-6']} alt="portfolio" />
                  </div>
                )
              )}
            </div>
          )}
          {selectedTab === Tab.ABOUT && <div className={classnames(styles.about)}>{hireInfo.aboutText}</div>}
        </div>
        <div className={styles.footer}>
          <div>
            {hireInfo.twitterUrl && hireInfo.twitterUrl.length > 0 && (
              <a target="_blank" rel="noreferrer" href={hireInfo.twitterUrl}>
                <Twitter />
              </a>
            )}
            {hireInfo.dribbbleUrl && hireInfo.dribbbleUrl.length > 0 && (
              <a target="_blank" rel="noreferrer" href={hireInfo.dribbbleUrl}>
                <Dribbble />
              </a>
            )}
            {hireInfo.instagramUrl && hireInfo.instagramUrl.length > 0 && (
              <a target="_blank" rel="noreferrer" href={hireInfo.instagramUrl}>
                <InstagramLogo />
              </a>
            )}
            {hireInfo.linkedInUrl && hireInfo.linkedInUrl.length > 0 && (
              <a target="_blank" rel="noreferrer" href={hireInfo.linkedInUrl}>
                <LinkedInLogo />
              </a>
            )}
          </div>
          <div className={styles.copyright}>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            &copy; {new Date().getFullYear()} {hireInfo.freelancer.name}
          </div>
          <div className="tar mrl">
            {currentUser?.attributes?.sub === hireInfo.freelancerID && (
              <Link href="/hire-page-editor">
                <a href="/hire-page-editor">
                  <Sprocket />
                </a>
              </Link>
            )}
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { req } = context;
//   let host;
//   let username = null;

//   host = req?.headers?.host;

//   if (typeof window !== 'undefined') {
//     host = window.location.host;
//   }

//   if (host) {
//     const isDev = host.includes('localhost');
//     const splitHost = host.split('.');

//     if ((!isDev && splitHost.length === 3) || (isDev && splitHost.length === 2)) {
//       if (username !== 'www') {
//         // eslint-disable-next-line prefer-destructuring
//         username = splitHost[0];
//       }
//     }
//   }

//   return { props: { username } };
// }

export default Hire;
