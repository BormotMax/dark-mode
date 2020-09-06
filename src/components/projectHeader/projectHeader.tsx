import classnames from 'classnames';
import Link from 'next/link';
import styles from './projectHeader.module.scss';
import Logo from '../../img/logo_gray.svg';
import { useCurrentUser } from '../../hooks';
import { gravatarUrl } from '../../helpers/gravatarUrl';

interface ProjectHeaderProps {
  headerText?: string;
  tabColor?: HeaderTabColor;
  headerColor?: HeaderColor;
}

export enum HeaderColor {
  GRAY = 'gray',
  WHITE = 'white',
}

export enum HeaderTabColor {
  GRAY = 'tabGray',
  PURPLE = 'tabPurple',
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  headerText,
  tabColor = HeaderTabColor.GRAY,
  headerColor = HeaderColor.WHITE,
}) => {
  const { currentUser, signOut } = useCurrentUser();
  const email = currentUser?.attributes?.email;

  const handleLogout = (e) => {
    if ((e as any).keyCode === undefined || (e as any).keyCode === 13) {
      signOut();
    }
  };

  return (
    <header className={classnames(styles.header, styles[headerColor])}>
      <div className={styles.upper}>
        <Link href="/">
          <a href="/">
            <Logo />
          </a>
        </Link>
        {headerText && <div className={classnames(styles.headerText, 'is-hidden-mobile', styles[tabColor])}>{headerText}</div>}
        <div>
          {currentUser && (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
              Logout
            </a>
          )}

          {email ? <img alt="avatar" className={styles.avatar} src={gravatarUrl(email)} /> : <div className={styles.avatar} />}
        </div>
      </div>

      {headerText && (
        <div className={classnames(styles.headerTextMobile, styles.headerText, 'is-block-mobile', styles[tabColor])}>{headerText}</div>
      )}
    </header>
  );
};
