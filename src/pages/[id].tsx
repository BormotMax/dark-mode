import React, { useCallback, useRef, useState, useMemo, memo } from 'react';
import { useRouter } from 'next/router';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import classnames from 'classnames';
import Storage from '@aws-amplify/storage';
import Carousel, { Modal as ImageModal, ModalGateway } from 'react-images';
import { useQuery, gql } from '@apollo/client';

import { HireInfoByDomainSlugQuery } from '../API';
import { hireInfoByDomainSlug } from '../graphql/queries';
import { HireMeModal } from '../components/hireMeModal';
import Modal from '../components/modal';
import { useCurrentUser, useFlash, useLogger, useAsync } from '../hooks';
import LinkedInLogo from '../img/linkedIn.svg';
import InstagramLogo from '../img/instagram.svg';
import Dribbble from '../img/dribbble.svg';
import Twitter from '../img/twitter.svg';
import { Header } from '../components/header';
import { Avatar } from '../components/avatar/avatar';
import { ButtonSmall } from '../components/buttons/buttons';
import { isClickOrEnter, getDatasetValue } from '../helpers/util';

import { unauthClient } from './_app';
import styles from './styles/hire.module.scss';

enum Tab {
  PORTFOLIO,
  ABOUT,
}

const PORTFOLIO_IMAGES_COUNT = 6;
const portfolioImagesSkeletons = new Array(PORTFOLIO_IMAGES_COUNT)
  .fill(null)
  .map((item, index) => [String(index), '']);

const Hire: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { setFlash } = useFlash();
  const { id: domainSlugID } = router.query;
  const [selectedTab, setSelectedTab] = useState(Tab.PORTFOLIO);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCarouselOpen, setCarouselOpen] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(-1);
  const [isSaving, setIsSaving] = useState(false);
  const blurbTextElement = useRef(null);
  const { logger } = useLogger();

  const {
    data: { hireInfoByDomainSlug: { items: [hireInfo] = [] } = {} } = {},
    loading,
  } = useQuery<HireInfoByDomainSlugQuery>(
    gql(hireInfoByDomainSlug),
    {
      skip: !domainSlugID,
      variables: { domainSlugID },
      client: unauthClient,
      onCompleted(data) {
        if (data.hireInfoByDomainSlug?.items?.length > 1) {
          logger.error('Hire: freelancer has more than one HireInfo', { input: { domainSlugID } });
        }
      },
      onError(error) {
        setFlash('There has been an error. Please contact support');
        logger.error('Hire: error getting hireInfoByDomainSlug', { error, input: { domainSlugID } });
      },
    },
  );

  const { value: portfolioImages = {} } = useAsync(
    async () => {
      if (!Array.isArray(hireInfo?.portfolioImages)) return {};
      const images = {};
      const promises = [];
      hireInfo.portfolioImages.forEach(({ key, tag }) => {
        try {
          promises.push(
            Storage.get(key).then((img) => {
              images[tag] = img;
            }),
          );
        } catch (error) {
          logger.error('Hire: error getting banner image', { error, input: key });
        }
      });
      await Promise.all(promises);
      return images;
    },
    [hireInfo],
  );

  const { value: bannerImage } = useAsync(
    async () => {
      const s3Key = hireInfo?.bannerImage?.key;
      if (!s3Key) return '';
      try {
        const loadedBanner = await Storage.get(hireInfo?.bannerImage?.key);
        return typeof loadedBanner === 'string' ? loadedBanner : '';
      } catch (error) {
        logger.error('Hire: error getting banner image', { error, input: s3Key });
        return '';
      }
    },
    [hireInfo],
  );

  const goToEditHirePage = useCallback(
    () => {
      setIsSaving(true);
      router.push('/hire-page-editor');
    },
    [],
  );

  const carouselImages = useMemo(
    () => Object.values(portfolioImages)
      .map((image) => ({ source: image as string })),
    [portfolioImages],
  );

  const toggleCarousel = (url: string) => {
    if (url) {
      const index = carouselImages.findIndex((el) => el.source === url);
      setCurrentCarouselIndex(index);
    } else {
      setCurrentCarouselIndex(-1);
    }
    setCarouselOpen((prevState) => !prevState);
  };

  const handleSetSelectedTab = (event: React.MouseEvent<EventTarget> | React.KeyboardEvent<EventTarget>) => {
    if (!isClickOrEnter(event)) {
      return;
    }
    const tab = getDatasetValue(event.target, 'tab');
    setSelectedTab(Number(tab));
  };

  const handleToggleCarousel = (e: React.MouseEvent<EventTarget> | React.KeyboardEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLImageElement)) {
      return;
    }
    if (isClickOrEnter(e)) {
      toggleCarousel(e.target.src);
    }
  };

  const closeModal = useCallback(
    () => {
      setModalOpen(false);
    },
    [],
  );

  const openModal = () => {
    setModalOpen(true);
  };

  const portfolioImagesArray = useMemo(
    (): Array<Array<string | null>> => (portfolioImages ? Object.entries(portfolioImages) : portfolioImagesSkeletons),
    [portfolioImages],
  );

  const headerContent = useMemo(
    () => (
      <div className={styles.header}>
        <div className={styles.headerText}>Hire Page preview</div>
        <ButtonSmall
          extraBorderRadius
          inverted
          padding="0 13px"
          onClick={goToEditHirePage}
          text="Edit"
          isSaving={isSaving}
        />
      </div>
    ),
    [goToEditHirePage, isSaving],
  );

  if (!loading && !hireInfo) return <div>There is no hire page here, yet.</div>;
  if (!hireInfo) return <div>Loading...</div>;

  const showHeader = currentUser?.attributes?.sub === hireInfo.freelancerID;
  const showCarousel = isCarouselOpen && currentCarouselIndex !== -1;
  const showCustomButton = !loading && hireInfo.buttonText;
  const portfolioSelected = selectedTab === Tab.PORTFOLIO;
  const aboutSelected = selectedTab === Tab.ABOUT;
  const { freelancer } = hireInfo;

  return (
    <div className={styles.hire}>
      <Modal maxWidth="877px" topPlacedModal closeModal={closeModal} isOpen={isModalOpen}>
        <HireMeModal
          freelancerEmail={freelancer.email}
          freelancerName={freelancer.name}
          freelancerID={hireInfo.freelancerID}
        />
      </Modal>
      <ModalGateway>
        {showCarousel && (
          <ImageModal onClose={() => toggleCarousel(null)}>
            <Carousel views={carouselImages} currentIndex={currentCarouselIndex} />
          </ImageModal>
        )}
      </ModalGateway>
      <SkeletonTheme color="#FAF8F7" highlightColor="white">
        {showHeader && (
          <Header>
            {headerContent}
          </Header>
        )}
        <div className={classnames(styles.upper)}>
          <div className={styles.bannerImage__mobile}>
            {hireInfo.bannerImage
              && (!bannerImage ? (
                <Skeleton height={640} width={1100} />
              ) : (
                <img alt="banner" className={classnames(styles.bannerImage)} src={bannerImage} />
              ))}
          </div>
          <div className={classnames(styles.leftContainer)}>
            <Avatar
              s3key={freelancer.avatar?.key}
              email={freelancer.email}
              name={freelancer.name}
              width={72}
              height={72}
            />
            <div className={classnames('text-small-caps', styles.name)}>{freelancer.name}</div>
            <div className={classnames(styles.title, 'h1')}>{freelancer.title}</div>
            <div ref={blurbTextElement} className={styles.blurbText}>
              {hireInfo.blurbText}
            </div>
            {showCustomButton && (
              <button onKeyPress={openModal} onClick={openModal} className={styles.button} type="button">
                {hireInfo.buttonText}
              </button>
            )}
          </div>
          <div className={styles.bannerImage__desktop}>
            {hireInfo.bannerImage
              && (!bannerImage ? (
                <Skeleton height={640} width={1200} />
              ) : (
                <img alt="banner" className={classnames(styles.bannerImage)} src={bannerImage} />
              ))}
          </div>
        </div>
        <div className={styles.content}>
          <div className={classnames('text-small-caps', styles.optionsBar)}>
            <div
              tabIndex={0}
              role="button"
              data-tab={Tab.PORTFOLIO}
              onKeyDown={handleSetSelectedTab}
              onClick={handleSetSelectedTab}
              className={classnames(styles.reset, { [styles.selected]: portfolioSelected })}
            >
              Portfolio
            </div>
            <div
              tabIndex={0}
              role="button"
              data-tab={Tab.ABOUT}
              onKeyDown={handleSetSelectedTab}
              onClick={handleSetSelectedTab}
              className={classnames(styles.reset, { [styles.selected]: aboutSelected }, 'mlxl')}
            >
              About
            </div>
          </div>
          {portfolioSelected && (
            <div className={styles.portfolioImages}>
              <div className={styles.flexGap}>
                {portfolioImagesArray.map(([key, image]) => {
                  if (!image) {
                    return (
                      <div key={key} className={styles.portfolioImageSize}>
                        <Skeleton />
                      </div>
                    );
                  }
                  return (
                    <div
                      key={key}
                      role="button"
                      tabIndex={0}
                      onKeyDown={handleToggleCarousel}
                      onClick={handleToggleCarousel}
                      className={styles.portfolioImage}
                    >
                      <img src={image} alt="portfolio" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {aboutSelected && <div className={classnames(styles.about)}>{hireInfo.aboutText}</div>}
        </div>
        <div className={styles.footer}>
          <div className={styles.linksWrapper}>
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
            &copy; {new Date().getFullYear()} {freelancer.name}
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default memo(Hire);
