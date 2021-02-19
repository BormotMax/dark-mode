import React, { useEffect, useRef, useState, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import gql from 'graphql-tag';
import classnames from 'classnames';

import { WithAuthentication, RouteType } from '../../components/withAuthentication';
import { getProject } from '../../graphql/queries';
import { Project, Comment as CommentType, AuthProps } from '../../types/custom';
import { unauthClient, client } from '../_app';
import { GetProjectQuery, CommentResourceType } from '../../API';
import { useFlash, useLogger } from '../../hooks';
import { CommentWrapper, NewComment } from '../../components/comment';
import { onCreateComment } from '../../graphql/subscriptions';
import { PageLayoutOne } from '../../components/pageLayoutOne';
import { Page } from '../../components/nav/nav';
import { isClickOrEnter } from '../../helpers/util';
import { CurrentProjectAction, useCurrentProject } from '../../hooks/useCurrentProject';
import ProjectMenu from '../../components/projectMenu';

import styles from '../styles/project.module.scss';

enum ProjectTabsEnum {
  Recent = 'Recent',
  All = 'All',
  Quotes = 'Quotes',
  Invoices = 'Invoices',
  Bookmarks = 'Bookmarks',
}

const ProjectPage: React.FC<AuthProps> = ({ currentUser }) => {
  const router = useRouter();
  const { id, token } = router.query;
  const [project, setProject] = useState(null);
  const [projectTab, setProjectTab] = useState(ProjectTabsEnum.Recent);
  const [viewerId, setViewerId] = useState(token || localStorage.getItem('viewerId'));
  const viewer = useRef(null);
  const projectViewer = useRef(null);
  const [loading, setLoading] = useState(true);
  const { setFlash, setDelayedFlash } = useFlash();
  const { logger } = useLogger();
  const currentUserId = currentUser?.attributes?.sub;
  const newCommentRef = useRef(null);
  const { currentProjectDispatch } = useCurrentProject();

  useEffect(() => {
    setViewerId(token || localStorage.getItem('viewerId'));
    if (token) {
      localStorage.setItem('viewerId', token as string);
    }
  }, [currentUser, token]);

  const determineViewer = (p) => {
    let viewerCandidate;
    const { clients, freelancers } = p as Project;
    const viewingClientItem = clients.items.find((c) => viewerId && c.user.signedOutAuthToken === viewerId);
    const viewingFreelancerItem = freelancers.items.find((f) => currentUserId && f?.user?.id === currentUserId);

    if (viewingFreelancerItem?.user) {
      viewerCandidate = viewingFreelancerItem;
    } else if (viewingClientItem?.user) {
      if (currentUserId) {
        logger.info('Project: signed in user acting as a client', { info: { id, viewerId, currentUserId } });
        setDelayedFlash("You can't view a project as a client while signed in as a freelancer.");
        Router.push('/projects');
      }
      viewerCandidate = viewingClientItem;
    }

    return { user: viewerCandidate?.user, projectUser: viewerCandidate };
  };

  const fetchProject = async () => {
    if (!id) return;
    const getProjectInput = { id };
    try {
      const getProjectResult: { data: GetProjectQuery } = await unauthClient.query({
        query: gql(getProject),
        variables: getProjectInput,
      });
      const currentProject: Project = getProjectResult.data?.getProject;
      const { user, projectUser } = determineViewer(currentProject);

      setProject(currentProject);
      currentProjectDispatch({
        type: CurrentProjectAction.SET_CURRENT_PROJECT,
        payload: {
          viewer: user,
          project: currentProject,
        },
      });

      viewer.current = user;
      projectViewer.current = projectUser;
    } catch (error) {
      setFlash("There was an error retrieving this project. We're looking into it.");
      logger.error('Project: error retrieving Project.', { error, input: getProjectInput });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    const execute = async () => {
      fetchProject();

      try {
        const subscriptionResult = client.subscribe({ query: gql(onCreateComment) });
        subscriptionResult.subscribe({
          next: (comment) => {
            const c = comment.data.onCreateComment;

            setProject((p) => {
              if (c.projectID !== p.id) return p;
              return { ...p, comments: { ...p.comments, items: [...p.comments.items, comment.data.onCreateComment] } };
            });

            if (viewer.current.id === c.creator.id) {
              newCommentRef?.current?.scrollIntoView();
            }
          },
        });
      } catch (error) {
        setFlash('Messaging may be unavailable. Try reloading the page.');
        logger.error('Project: error subscribing to onCreateComment', { error });
      }
    };
    execute();
  }, [id]);

  const handleFilterChange = (e, filterOption) => {
    if (isClickOrEnter(e)) {
      setProjectTab(filterOption);
    }
  };

  const headerText = useMemo(
    () => (
      <>{project?.title || project?.clients?.items.find((i) => i.isInitialContact)?.user.name || 'Title'}</>
    ),
    [project],
  );

  const comments = useMemo(
    () => {
      const items = project?.comments?.items || [];
      return [...items].sort(
        (e1, e2) => new Date(e1?.createdAt).getTime() - new Date(e2?.createdAt).getTime(),
      ) as Array<CommentType>;
    },
    [project],
  );

  if (!viewerId && !currentUserId) Router.push('/sign-in');
  if (!loading && !project) return <div>Not found</div>;
  if (!loading && !viewer.current) {
    logger.info('Project: no viewer on Projects space', { info: { id, viewerId, currentUserId } });
    Router.push('/sign-in');
    return null;
  }

  const { quotes, clients = {}, freelancers, assets } = project as Project || {};

  const projectTabOptions = {
    [ProjectTabsEnum.Recent]: {
      header: 'Recent',
      filterFxn: (_item, idx: number, arr) => idx >= (arr.length - 20), // most recent 20
    },
    [ProjectTabsEnum.All]: {
      header: `All - ${comments.length}`,
      filterFxn: (item) => item,
    },
    [ProjectTabsEnum.Quotes]: {
      header: `Quotes - ${comments.filter(({ includedResourceType }) => includedResourceType === CommentResourceType.QUOTE).length}`,
      filterFxn: ({ includedResourceType }) => includedResourceType === CommentResourceType.QUOTE,
    },
  };

  return (
    <PageLayoutOne
      headerText={headerText}
      headerContainer={styles.headerContainer}
      page={Page.PROJECT}
    >
      <div className={classnames('column', styles.hideTablet, styles.leftColumn, styles.commentWrapper)}>
        <Filters projectTabOptions={projectTabOptions} projectTab={projectTab} handleFilterChange={handleFilterChange} />
        <Feed
          comments={comments}
          projectTabOptions={projectTabOptions}
          projectTab={projectTab}
          viewer={viewer}
          newCommentRef={newCommentRef}
          id={id}
        />
      </div>
      {project && (
        <div className={classnames('column', styles.hideTablet, styles.rightColumn)}>
          <ProjectMenu
            viewer={viewer}
            clients={clients}
            freelancers={freelancers}
            project={project}
            fetchProject={fetchProject}
            currentUserId={currentUserId}
            assets={assets}
            quotes={quotes}
          />
        </div>
      )}
      <Filters projectTabOptions={projectTabOptions} projectTab={projectTab} handleFilterChange={handleFilterChange} />
      <div
        className={classnames(
          'container',
          'columns',
          styles.hideMobile,
          styles.desktopColumns,
          { [styles.center]: !currentUser?.attributes?.sub },
        )}
      >
        <div className={classnames('column', styles.leftColumn, styles.commentWrapper)}>
          <Feed
            comments={comments}
            projectTabOptions={projectTabOptions}
            projectTab={projectTab}
            viewer={viewer}
            newCommentRef={newCommentRef}
            id={id}
          />
        </div>
        {project && (
          <div className={classnames('column', styles.rightColumn)}>
            <ProjectMenu
              viewer={viewer}
              clients={clients}
              freelancers={freelancers}
              project={project}
              fetchProject={fetchProject}
              currentUserId={currentUserId}
              assets={assets}
              quotes={quotes}
            />
          </div>
        )}
      </div>
    </PageLayoutOne>
  );
};

const Filters = ({ projectTabOptions, projectTab, handleFilterChange }) => (
  <div className={classnames(styles.filters)}>
    {Object.entries(projectTabOptions).map(([k, v]) => (
      <div
        role="button"
        tabIndex={0}
        className={classnames(styles.filter, { [styles.activeFilter]: projectTab === k })}
        onClick={(e) => handleFilterChange(e, k)}
        onKeyDown={(e) => handleFilterChange(e, k)}
        key={(v as any).header}
      >{(v as any).header}
      </div>
    ))}
  </div>
);

const Feed = ({ comments, projectTabOptions, projectTab, viewer, newCommentRef, id }) => {
  const currentViewer = viewer?.current || {};
  return (
    <>
      {comments.filter(projectTabOptions[projectTab].filterFxn).map((comment) => (
        <CommentWrapper
          key={comment.id}
          comment={comment}
          viewerId={currentViewer.id as string}
        />
      ))}
      <div ref={newCommentRef}>
        <NewComment
          name={currentViewer.name}
          email={currentViewer.email}
          title={currentViewer.title}
          projectID={id as string}
          creatorID={currentViewer.id}
          s3key={currentViewer.avatar?.key ?? ''}
        />
      </div>
    </>
  );
};

export default WithAuthentication(ProjectPage, { routeType: RouteType.NO_REDIRECT });
