import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonSign, faRocket } from '@fortawesome/pro-light-svg-icons';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import styles from './sideNav.module.scss';
import { useCurrentUser, useLogger, useFlash } from '../../hooks';
import { client } from '../../pages/_app';
import { getHireMeInfo } from '../../graphql/queries';
import { GetHireMeInfoQuery } from '../../API';

export enum Page {
  PROJECTS,
  HIRE,
  HIRE_EDITOR,
}

interface SideNavProps {
  page?: Page;
}

export const SideNav: React.FC<SideNavProps> = ({ page }) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();
  const { logger } = useLogger();
  const { setFlash } = useFlash();

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
          setFlash("Make sure you've filled out the Hire Page Editor first.");
        }
      } catch (error) {
        logger.error('SideNav: error getting HireMeInfo', { error, input: getHireMeInfoInput });
        setFlash("Something went wrong. We're looking into it");
      }
    }
  };

  return (
    <div className={classnames(styles.sideNav)}>
      <ul className={classnames(styles.navList)}>
        <li className={classnames({ [styles.current]: page === Page.PROJECTS })}>
          <Link href="/projects">
            <a href="/projects">
              <FontAwesomeIcon size="1x" icon={faRocket} />
              &nbsp;&nbsp;Projects
            </a>
          </Link>
        </li>
        <li className={classnames({ [styles.current]: page === Page.HIRE_EDITOR })}>
          <Link href="/hirePageEditor">
            <a href="/hirePageEditor">
              <FontAwesomeIcon size="1x" icon={faPersonSign} />
              &nbsp;&nbsp;Hire Page
            </a>
          </Link>
        </li>
        {/* <li className={classnames({ [styles.current]: page === Page.HIRE })}>
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a tabIndex={0} role="link" onKeyDown={navToHirePage} onClick={navToHirePage}>
            <FontAwesomeIcon size="1x" icon={faPersonSign} />
            &nbsp;&nbsp;Hire Page
          </a>
        </li> */}
      </ul>
    </div>
  );
};
