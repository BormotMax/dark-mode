import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
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
import Twitter from '../../img/twitter.svg';
import styles from '../styles/hire.module.scss';
import { Header } from '../../components/header';
import { Page } from '../../components/nav/nav';
import { Avatar } from '../../components/avatar/avatar';
import { ButtonSmall } from '../../components/buttons/buttons';
import { isClickOrEnter, getDatasetValue } from '../../helpers/util';

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

  const goToEditHirePage = useCallback(
    () => {
      setIsSaving(true);
      router.push('/hire-page-editor');
    },
    [],
  );

  const carouselImages = useMemo(
    () => Object.values(portfolioImages || {})
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
          <Header
            withLevelingMargin={false}
            headerText="Hire Page preview"
            page={Page.HIRE}
          >
            <ButtonSmall
              extraBorderRadius
              inverted
              padding="0 13px"
              onClick={goToEditHirePage}
              text="Edit"
              isSaving={isSaving}
            />
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
              s3key={freelancer.avatar.key}
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

export default Hire;
