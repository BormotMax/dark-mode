import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonSign, faComments, faRocket } from '@fortawesome/pro-light-svg-icons';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import styles from './sideNav.module.scss';
import { useCurrentUser } from '../../hooks';
import { client } from '../../pages/_app';
import { getHireMeInfo } from '../../graphql/queries';
import { GetHireMeInfoQuery } from '../../API';
import { Avatar } from '../avatar/avatar';

export const SideNav: React.FC = () => {
  const { currentUser, signOut } = useCurrentUser();
  const router = useRouter();

  const navToHirePage = async (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      try {
        const { data }: { data: GetHireMeInfoQuery } = await client.query({
          query: gql(getHireMeInfo),
          variables: { freelancerID: currentUser.attributes.sub },
        });

        const slug = data?.getHireMeInfo?.domainSlug?.slug;
        if (slug) {
          router.push('/hire/[id]', `/hire/${slug}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogout = (e) => {
    if ((e as any).keyCode === undefined || (e as any).keyCode === 13) {
      signOut();
    }
  };

  return (
    <div className={classnames(styles.sideNav)}>
      <Avatar email={currentUser.attributes.email} />
      &nbsp;&nbsp;
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
        Logout
      </a>
      <ul className={classnames(styles.navList)}>
        <li>
          <FontAwesomeIcon size="1x" icon={faComments} />
          &nbsp;&nbsp;Conversations
        </li>
        <li className={classnames(styles.inner)}>
          <Link href="/projects">
            <a href="/projects">
              <FontAwesomeIcon size="1x" icon={faRocket} />
              &nbsp;&nbsp;Projects
            </a>
          </Link>
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a tabIndex={0} role="link" onKeyDown={navToHirePage} onClick={navToHirePage}>
            <FontAwesomeIcon size="1x" icon={faPersonSign} />
            &nbsp;&nbsp;Hire Page
          </a>
        </li>
      </ul>
    </div>
  );
};
