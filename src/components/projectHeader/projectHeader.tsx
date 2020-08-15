import classnames from 'classnames';
import styles from './projectHeader.module.scss';
import Logo from '../../img/logo_gray.svg';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { gravatarUrl } from '../../helpers/gravatarUrl';

interface ProjectHeaderProps {
  headerText: string;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ headerText }) => {
  const { currentUser, signOut } = useCurrentUser();
  const email = currentUser?.attributes?.email;

  const handleLogout = (e) => {
    if ((e as any).keyCode === undefined || (e as any).keyCode === 13) {
      signOut();
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.upper}>
        <Logo />
        <div className={classnames(styles.headerText, 'is-hidden-mobile')}>{headerText}</div>
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

      <div className={classnames(styles.headerTextMobile, styles.headerText, 'is-block-mobile')}>{headerText}</div>
    </header>
  );
};
