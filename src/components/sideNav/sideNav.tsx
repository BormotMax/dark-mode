import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonSign, faComments, faRocket, faChevronLeft, faSignOut } from '@fortawesome/pro-light-svg-icons';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import styles from './sideNav.module.scss';
import { useCurrentUser, useLogger } from '../../hooks';
import { client } from '../../pages/_app';
import { getHireMeInfo } from '../../graphql/queries';
import { GetHireMeInfoQuery } from '../../API';
import { Avatar } from '../avatar/avatar';

export const SideNav: React.FC = () => {
  const { currentUser, signOut } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { logger } = useLogger();

  const navToHirePage = async (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      const getHireMeInfoInput = { freelancerID: currentUser.attributes.sub };
      try {
        const { data }: { data: GetHireMeInfoQuery } = await client.query({
          query: gql(getHireMeInfo),
          variables: getHireMeInfoInput,
        });

        const slug = data?.getHireMeInfo?.domainSlug?.slug;
        if (slug) {
          router.push('/hire/[id]', `/hire/${slug}`);
        } else {
          logger.error('SideNav: no slug to nav to hire page', { input: getHireMeInfoInput });
          // todo: setFlash("Make sure you've filled out the Hire Page Editor first.")
        }
      } catch (error) {
        logger.error('SideNav: error getting HireMeInfo', { error, input: getHireMeInfoInput });
        // todo: setFlash("Something went wrong. We're looking into it");
      }
    }
  };

  const handleLogout = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      signOut();
    }
  };

  const toggle = (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={classnames(styles.sideNav, { [styles.closed]: !isOpen })}>
      <div className={classnames(styles.upper)}>
        <div className={classnames(styles.hide)}>
          <Avatar email={currentUser.attributes.email} />
          &nbsp;&nbsp;
        </div>
        <div role="button" className={classnames(styles.close)} tabIndex={0} onKeyDown={toggle} onClick={toggle}>
          {isOpen ? <FontAwesomeIcon size="1x" icon={faChevronLeft} /> : <FontAwesomeIcon size="1x" icon={faChevronRight} />}
        </div>
      </div>
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
        <li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a role="button" tabIndex={0} onKeyDown={handleLogout} onClick={handleLogout}>
            <FontAwesomeIcon size="1x" icon={faSignOut} />
            &nbsp;&nbsp;Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
