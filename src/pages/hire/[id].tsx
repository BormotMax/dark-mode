/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { Storage } from 'aws-amplify';
import { useState, useEffect, useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Carousel, { Modal as ImageModal, ModalGateway } from 'react-images';
import styles from '../styles/hire.module.scss';
import LinkedInLogo from '../../img/linkedIn.svg';
import InstagramLogo from '../../img/instagram.svg';
import Dribbble from '../../img/dribbble.svg';
import { HireInfoByDomainSlugQuery } from '../../API';
import { hireInfoByDomainSlug } from '../../graphql/queries';
import { unauthClient as client } from '../_app';
import { HireMeModal } from '../../components/hireMeModal';
import { Modal } from '../../components/modal';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { HireMeInfo } from '../../types/custom';

enum Tab {
  PORTFOLIO,
  ABOUT,
}

const Hire: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedTab, setSelectedTab] = useState(Tab.PORTFOLIO);
  const [hireInfo, setHireInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portfolioImages, setPortfolioImages] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCarouselOpen, setCarouselOpen] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(null);
  const blurbTextElement = useRef(null);

  function handleResize() {
    if (blurbTextElement.current) {
      let relFontsize = blurbTextElement.current.offsetWidth * 0.07;
      relFontsize = Math.min(36, relFontsize);
      relFontsize = Math.max(20, relFontsize);
      blurbTextElement.current.style.fontSize = `${relFontsize}px`;
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const execute = async () => {
      if (!id) return;
      try {
        const { data }: { data: HireInfoByDomainSlugQuery } = await client.query({
          query: gql(hireInfoByDomainSlug),
          variables: { domainSlugID: id },
        });

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
            } catch (err) {
              console.log(err);
            }
          });

          Promise.all(promises).then(() => setPortfolioImages(map));

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
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    execute();
  }, [id]);

  const toggleCarousel = (index?: number) => {
    setCurrentCarouselIndex(index);
    setCarouselOpen(!isCarouselOpen);
  };

  if (!loading && !hireInfo) return <div>There is no hire page here, yet.</div>;
  const carouselImages = Object.values(portfolioImages || {}).map((image) => ({ source: image as string }));

  return (
    <div className={classnames(styles.hire)}>
      <Modal handleClose={() => setModalOpen(false)} isOpen={isModalOpen}>
        <HireMeModal
          freelancerEmail={hireInfo?.email}
          handleClose={() => setModalOpen(false)}
          freelancerName={hireInfo?.name}
          avatarUrl={gravatarUrl(hireInfo?.email)}
        />
      </Modal>
      <ModalGateway>
        {isCarouselOpen && currentCarouselIndex !== null && (
          <ImageModal onClose={() => toggleCarousel(null)}>
            <Carousel views={carouselImages} currentIndex={currentCarouselIndex} />
          </ImageModal>
        )}
      </ModalGateway>
      <SkeletonTheme color="#FAF8F7" highlightColor="white">
        <div className={styles.upper}>
          <div className={classnames(styles.leftContainer, 'is-block-desktop')}>
            <div className={classnames('text-small-caps', styles.name)}>{hireInfo?.name}</div>
            <div className={classnames(styles.title, 'h1')}>{hireInfo?.title}</div>
            <div ref={blurbTextElement} className={styles.blurbText}>
              {hireInfo?.blurbText}
            </div>
            {!loading && (
              <div className="tar">
                <button onClick={() => setModalOpen(true)} className={styles.button} type="button">
                  {hireInfo?.buttonText}
                </button>
              </div>
            )}
          </div>
          <div className={styles.bannerImageContainer}>
            {bannerImage && <img alt="banner" className={styles.bannerImage} src={bannerImage} />}
          </div>
        </div>
        <div className={classnames(styles.leftContainer, 'is-hidden-desktop')}>
          <div className={styles.left}>
            <div className={classnames('text-small-caps', styles.name)}>{hireInfo?.name}</div>
            <div className={classnames(styles.title, 'h1')}>{hireInfo?.title}</div>
            <div className={styles.blurbText}>{hireInfo?.blurbText}</div>
            {!loading && (
              <div className="tar">
                <button onClick={() => setModalOpen(true)} className={styles.button} type="button">
                  {hireInfo?.buttonText}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="container is-fullhd">
          <div className={classnames('text-small-caps', styles.optionsBar)}>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => setSelectedTab(Tab.PORTFOLIO)}
              onClick={() => setSelectedTab(Tab.PORTFOLIO)}
              className={classnames({ [styles.selected]: selectedTab === Tab.PORTFOLIO })}
            >
              Portfolio
            </div>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => setSelectedTab(Tab.ABOUT)}
              onClick={() => setSelectedTab(Tab.ABOUT)}
              className={classnames({ [styles.selected]: selectedTab === Tab.ABOUT }, 'mlxl')}
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
                <div onClick={() => toggleCarousel(0)} className={styles.portfolioImage}>
                  <img src={portfolioImages['portfolio-1']} alt="portfolio" />
                </div>
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                <div onClick={() => toggleCarousel(1)} className={styles.portfolioImage}>
                  <img src={portfolioImages['portfolio-2']} alt="portfolio" />
                </div>
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                <div onClick={() => toggleCarousel(2)} className={styles.portfolioImage}>
                  <img src={portfolioImages['portfolio-3']} alt="portfolio" />
                </div>
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                <div onClick={() => toggleCarousel(3)} className={styles.portfolioImage}>
                  <img src={portfolioImages['portfolio-4']} alt="portfolio" />
                </div>
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                <div onClick={() => toggleCarousel(4)} className={styles.portfolioImage}>
                  <img src={portfolioImages['portfolio-5']} alt="portfolio" />
                </div>
              )}
              {!portfolioImages ? (
                <div className={styles.skeletonWrapper}>
                  <Skeleton height={300} width={300} />
                </div>
              ) : (
                <div onClick={() => toggleCarousel(5)} className={styles.portfolioImage}>
                  <img src={portfolioImages['portfolio-6']} alt="portfolio" />
                </div>
              )}
            </div>
          )}
          {selectedTab === Tab.ABOUT && <div className={classnames(styles.about)}>{hireInfo?.aboutText}</div>}
        </div>
        <div className={styles.footer}>
          <div>
            <a target="_blank" rel="noreferrer" href={hireInfo?.twitterUrl}>
              <Dribbble />
            </a>
            <a target="_blank" rel="noreferrer" href={hireInfo?.instagramUrl}>
              <InstagramLogo />
            </a>
            <a target="_blank" rel="noreferrer" href={hireInfo?.linkedInUrl}>
              <LinkedInLogo />
            </a>
          </div>
          <div className={styles.copyright}>
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            &copy; {new Date().getFullYear()} {hireInfo?.name}
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  let host;
  let username = null;

  host = req?.headers?.host;

  if (typeof window !== 'undefined') {
    host = window.location.host;
  }

  if (host) {
    const isDev = host.includes('localhost');
    const splitHost = host.split('.');

    if ((!isDev && splitHost.length === 3) || (isDev && splitHost.length === 2)) {
      if (username !== 'www') {
        // eslint-disable-next-line prefer-destructuring
        username = splitHost[0];
      }
    }
  }

  return { props: { username } };
}

export default Hire;