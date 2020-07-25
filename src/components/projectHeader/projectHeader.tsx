import classnames from 'classnames';
import styles from './projectHeader.module.scss';
import Logo from '../../img/logo_gray.svg';

interface ProjectHeaderProps {
  headerText: string
  avatar?: string
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ headerText, avatar }) => (
  <header className={styles.header}>
    <div className={styles.upper}>
      <Logo />
      <div className={classnames(styles.headerText, 'is-hidden-mobile')}>
        {headerText}
      </div>
      {avatar
        ? <img alt="avatar" className={styles.avatar} src={avatar} />
        : <div className={styles.avatar} />}
    </div>

    <div className={classnames(styles.headerTextMobile, styles.headerText, 'is-block-mobile')}>
      {headerText}
    </div>

  </header>
);
