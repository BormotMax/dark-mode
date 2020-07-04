import styles from './projectHeader.module.scss';
import Logo from '../../img/logo.svg';

interface ProjectHeaderProps {
  headerText: string
  avatar?: string
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ headerText, avatar }) => (
  <header className={styles.header}>
    <div className={styles.upper}>
      <Logo />
      <img alt="avatar" className={styles.avatar} src={avatar} />
    </div>
    <div className={styles.lower}>
      {headerText}
    </div>
  </header>
);
