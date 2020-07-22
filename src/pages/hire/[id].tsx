import styles from '../styles/hire.module.scss';
import LinkedInLogo from '../../img/linkedIn.svg';
import gql from 'graphql-tag';
import InstagramLogo from '../../img/instagram.svg';
import Dribbble from '../../img/dribbble.svg';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { Storage } from 'aws-amplify';
import { useState, useEffect, useContext } from 'react';
import { GetHireMeInfoQuery } from '../../API';
import { getHireMeInfo } from '../../graphql/queries';
import { ApolloContext } from 'react-apollo';

const images = [
  '/portfolio_0.png',
  '/portfolio_1.png',
  '/portfolio_2.png',
  '/portfolio_3.png',
  '/portfolio_4.png',
  '/portfolio_5.png',
];

const name = 'Naomi Price';

enum Tab {
  PORTFOLIO,
  ABOUT
}

const Hire: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedTab, setSelectedTab] = useState(Tab.PORTFOLIO)
  const [hireInfo, setHireInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [portfolioImages, setPortfolioImages] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const { client } = useContext(ApolloContext);

  useEffect(() => {
    const execute = async () => {
      if(!id) return;
      try {
        const { data }: {data: GetHireMeInfoQuery} = await client.query({
          query: gql(getHireMeInfo),
          variables: { freelancerID: id },
        });

        const info = data?.getHireMeInfo;

        if (info) {
          const map = {};
          const promises = [];

          info.portfolioImages?.forEach(({ key, tag }) => {
            try {
              promises.push(Storage.get(key).then((img) => map[tag] = img));
            } catch (err) {
              console.log(err);
            }
          });

          Promise.all(promises).then(() => setPortfolioImages(map))

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

  if (loading) return <div>Loading...</div>;
  if (!hireInfo) return <div>There is no hire page here, yet.</div>;

  const { name, title, buttonText, blurbText, aboutText } = hireInfo;
  return (
    <div className={styles.hire}>
      <div className={styles.upper}>
        <div className={classnames(styles.leftContainer, "is-block-fullhd")}>
          <div className={styles.left}>
          <div className={classnames("text-small-caps", styles.name)}>{name}</div>
          <div className={classnames(styles.title, "h1")}>{title}</div>
          <div className={styles.blurbText}>{blurbText}</div>
          <div className="tar">
            <button className={styles.button} type="button">{buttonText}</button>
          </div>
          </div>
        </div>
        <div className={styles.bannerImageContainer}>
          {
            bannerImage && <img className={styles.bannerImage} src={bannerImage} />
          }
        </div>
      </div>
      <div className="container is-fullhd">
        <div className={classnames("text-small-caps", styles.optionsBar)}>
          <div onClick={() => setSelectedTab(Tab.PORTFOLIO)} className={classnames({[styles.selected]: selectedTab === Tab.PORTFOLIO})}>Portfolio</div>
          <div onClick={() => setSelectedTab(Tab.ABOUT)} className={classnames({[styles.selected]: selectedTab === Tab.ABOUT}, "mlxl")}>About</div>
        </div>
        {selectedTab === Tab.PORTFOLIO && !portfolioImages && <div className={styles.imageLoader}></div> }
        {
          selectedTab === Tab.PORTFOLIO && portfolioImages &&
            <div className={styles.portfolioImages}>
              <div className={styles.portfolioImage}><img src={portfolioImages["portfolio-1"]} alt="portfolio" /></div>
              <div className={styles.portfolioImage}><img src={portfolioImages["portfolio-2"]} alt="portfolio" /></div>
              <div className={styles.portfolioImage}><img src={portfolioImages["portfolio-3"]} alt="portfolio" /></div>
              <div className={styles.portfolioImage}><img src={portfolioImages["portfolio-4"]} alt="portfolio" /></div>
              <div className={styles.portfolioImage}><img src={portfolioImages["portfolio-5"]} alt="portfolio" /></div>
              <div className={styles.portfolioImage}><img src={portfolioImages["portfolio-6"]} alt="portfolio" /></div>
            </div>
        }
        {
         selectedTab === Tab.ABOUT &&
         <div className={classnames(styles.about)}>
           {aboutText}
         </div> 
        }
      </div>
      <div className={styles.footer}>
        <div>
          <InstagramLogo />
          <LinkedInLogo />
          <Dribbble />
        </div>
        <div className={styles.copyright}>
          &copy;
          {' '}
          {new Date().getFullYear()}
          {' '}
          {name}
        </div>
      </div>
    </div>
  )
};

export default Hire;
