import classnames from 'classnames';
import Link from 'next/link';
import styles from './projectHeader.module.scss';
import Logo from '../../img/logo4.svg';

export const ProjectHeader: React.FC = () => {
  return (
    <header className={classnames(styles.header)}>
      <Link href="/">
        <a href="/">
          <Logo />
        </a>
      </Link>
    </header>
  );
};
