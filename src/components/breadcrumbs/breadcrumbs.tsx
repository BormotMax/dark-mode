import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  faAngleRight,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { useCurrentProject } from '../../hooks/useCurrentProject';
import { Project } from '../../types/custom';

import styles from './breadcrumbs.module.scss';

const convertPath = (path: string) => path
  .replace(/-/g, ' ')
  .replace(/oe/g, 'ö')
  .replace(/ae/g, 'ä')
  .replace(/ue/g, 'ü');

const getProjectTitle = (project: Project): string => {
  const client = project?.clients?.items?.find((item) => item?.isInitialContact);
  const clientName = client?.user?.name;
  return project?.title || clientName || 'Title';
};

const getProjectsBreadcrumbs = (dividedPathArr: string[], routerPathName: string, project: Project) => {
  const isProjectsPage = routerPathName === '/projects';

  const projectsBreadcrumbs = dividedPathArr.map((path, index) => {
    const breadcrumb = {
      path: convertPath(path),
      href: `/${dividedPathArr.slice(0, index + 1).join('/')}`,
    };

    // do not show id until project title is received
    if (index >= 1 && !project) {
      breadcrumb.path = '';
      return breadcrumb;
    }

    // replace project id to project title
    if (path === project?.id) {
      breadcrumb.path = getProjectTitle(project);
    }

    return breadcrumb;
  });

  // no links for root page; add extra title
  if (isProjectsPage) {
    projectsBreadcrumbs[0].href = '';
    projectsBreadcrumbs.push({
      path: 'All Projects',
      href: '',
    });
  }
  return projectsBreadcrumbs;
};

const getBreadcrumbs = (dividedPathArr: string[]) => dividedPathArr.map((path, index) => ({
  path: convertPath(path),
  href: `/${dividedPathArr.slice(0, index + 1).join('/')}`,
}));

type Breadcrumb = {
  path: string,
  href: string,
};
type Breadcrumbs = Breadcrumb[] | null;

const Breadcrumbs = (): JSX.Element => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = React.useState<Breadcrumbs>(null);
  const { currentProjectState: { project } } = useCurrentProject();

  React.useEffect(() => {
    if (!router.asPath) return;

    const isProjectsPage = router.pathname.includes('/projects');
    const [fullPath] = router.asPath.split(/[?#]/);
    const dividedPathArr = fullPath.split('/').filter(Boolean);
    const breadcrumbsArr = isProjectsPage
      ? getProjectsBreadcrumbs(dividedPathArr, router.pathname, project)
      : getBreadcrumbs(dividedPathArr);

    setBreadcrumbs(breadcrumbsArr);
  }, [router.asPath, router.pathname, project]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav className={styles.nav} aria-label="breadcrumbs">
      <ol className={styles.list}>
        {breadcrumbs.map(({ path, href }, index) => {
          const hasManyBreadcrumbs = breadcrumbs.length > 1;
          const firstPathClassName = classnames({ [styles.firstPath]: index === 0 && hasManyBreadcrumbs });
          const pathAsLink = href && hasManyBreadcrumbs;
          return (
            <li key={`${path}-${href}`}>
              {pathAsLink
                ? (
                  <Link href={href}>
                    <a className={firstPathClassName}>
                      {path}
                    </a>
                  </Link>
                )
                : <span className={firstPathClassName}>{path}</span>}
              {breadcrumbs.length - 1 !== index && (
                <span className={styles.divider}>
                  <FontAwesomeIcon size="1x" icon={faAngleRight} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default React.memo(Breadcrumbs);
