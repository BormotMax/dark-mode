import styles from './styles/hire.module.scss';
import LinkedInLogo from '../img/linkedIn.svg';
import InstagramLogo from '../img/instagram.svg';
import Dribbble from '../img/dribbble.svg';

const images = [
  '/portfolio_0.png',
  '/portfolio_1.png',
  '/portfolio_2.png',
  '/portfolio_3.png',
  '/portfolio_4.png',
  '/portfolio_5.png',
];

const name = 'Naomi Price';

const Hire: React.FC = () => (
  <div className={styles.hire}>
    <div className={styles.headerContainer}>
      <div className={`${styles.header} container is-fullhd`}>
        <div className="header-1-md">
          {name}
        </div>
        <div className="header-1-md">
          Freelance Illustrator
        </div>
      </div>
    </div>
    <div className="tac">
      <img alt="hire" src="/hire.png" />
    </div>
    <div className="container is-fullhd">
      <div className={styles.optionsBar}>
        <div>
          <span>Portfolio</span>
          <span className="mls">About</span>
        </div>
        <button type="button">HIRE ME</button>
      </div>
      <div className={styles.portfolioImages}>
        {images.map((image) => <div key={image} className={styles.portfolioImage}><img src={image} alt="portfolio" /></div>)}
      </div>
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
);

export default Hire;
