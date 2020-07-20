import styles from '../styles/hire.module.scss';
import LinkedInLogo from '../../img/linkedIn.svg';
import InstagramLogo from '../../img/instagram.svg';
import Dribbble from '../../img/dribbble.svg';
import classnames from 'classnames';
import { useState } from 'react';

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
  const [selectedTab, setSelectedTab] = useState(Tab.PORTFOLIO)

  return (
  <div className={styles.hire}>
    <div className={styles.upper}>
      <div className={classnames(styles.left, "is-block-fullhd")}>
        <div className={classnames("text-small-caps", styles.name)}>NAOMI PRICE</div>
        <div className={classnames(styles.title, "h1")}>Freelance Illustrator</div>
        <div className={styles.blurbText}>I am an illustrator by education and training. I studied fine art and art history at Boston University then went on to.</div>
        <div className="tar">
          <button className={styles.button} type="button">Start A Conversation</button>
        </div>
      </div>
      <img className={styles.bannerImage} src="/hire2.png" />
    </div>
    <div className="container is-fullhd">
      <div className={classnames("text-small-caps", styles.optionsBar)}>
        <div onClick={() => setSelectedTab(Tab.PORTFOLIO)} className={classnames({[styles.selected]: selectedTab === Tab.PORTFOLIO})}>Portfolio</div>
        <div onClick={() => setSelectedTab(Tab.ABOUT)} className={classnames({[styles.selected]: selectedTab === Tab.ABOUT}, "mlxl")}>About</div>
      </div>
      {
        selectedTab === Tab.PORTFOLIO &&
       <div className={styles.portfolioImages}>
          {images.map((image) => <div key={image} className={styles.portfolioImage}><img src={image} alt="portfolio" /></div>)}
        </div>
      }
      {
       selectedTab === Tab.ABOUT &&
       <div className={classnames(styles.about)}>
         {`Hello, I am Naomi, and I live and breathe illustration.

I am an illustrator by education and training. I studied fine art history at Boston University then went on to receive my MFA in illustration, with distinction, from Yale University.

I have participated in 24 gallery shows and 9 solo exihibits at distinguished institutions such as the Musee du Louvre, The Metropolitan Museum of Art and the Boston Museum of Fine Arts.

My illustrations have been featured in Vogue, Bazaar, Marie Claire and dozens more magazines. I have had the privilege of working for distinguished clients such as Tiffany, Van Cleef and Arples, Chanel, Acne and Estee Lauder.

I am currenly accepting new engagements.`}
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
)};

export default Hire;
