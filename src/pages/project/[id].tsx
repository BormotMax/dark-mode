import React, { useEffect, useRef, useState, useMemo, memo } from 'react';
import Router, { useRouter } from 'next/router';
import classnames from 'classnames';
import { useSubscription, useQuery, gql } from '@apollo/client';

import { WithAuthentication, RouteType } from '../../components/withAuthentication';
import { getProject } from '../../graphql/queries';
import { Project, Comment as CommentType, AuthProps, User } from '../../types/custom';
import { unauthClient, client } from '../_app';
import { GetProjectQuery, CommentResourceType, OnCreateCommentSubscription } from '../../API';
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
  const [project, setProject] = useState<Project>(null);
  const [projectTab, setProjectTab] = useState(ProjectTabsEnum.Recent);
  const [viewerId, setViewerId] = useState(token || localStorage.getItem('viewerId'));
  const viewer = useRef<User>(null);
  const projectViewer = useRef<User>(null);
  const [loading, setLoading] = useState(true);
  const { setFlash, setDelayedFlash } = useFlash();
  const { logger } = useLogger();
  const currentUserId = currentUser?.attributes?.sub;
  const newCommentRef = useRef<HTMLDivElement>(null);
  const { currentProjectDispatch } = useCurrentProject();

  const {
    data: { getProject: fetchedProject } = {},
    refetch: fetchProject,
  } = useQuery<GetProjectQuery>(
    gql(getProject),
    {
      skip: !id,
      variables: { id },
      client: unauthClient,
      onError(error) {
        setFlash("There was an error retrieving this project. We're looking into it.");
        logger.error('Project: error retrieving Project.', { error, input: { id } });
        setLoading(false);
      },
    },
  );

  useEffect(
    () => {
      if (!fetchedProject) return;
      // determineViewer
      let viewerCandidate;
      const { clients, freelancers } = fetchedProject;
      const viewingClientItem = clients.items
        .find((viewerClient) => viewerId && viewerClient?.user?.signedOutAuthToken === viewerId);
      const viewingFreelancerItem = freelancers.items
        .find((freelancer) => currentUserId && freelancer?.user?.id === currentUserId);

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
      const user = viewerCandidate?.user;
      const projectUser = viewerCandidate;

      setProject(fetchedProject);
      currentProjectDispatch({
        type: CurrentProjectAction.SET_CURRENT_PROJECT,
        payload: {
          viewer: user,
          project: fetchedProject,
        },
      });

      viewer.current = user;
      projectViewer.current = projectUser;
      setLoading(false);
    },
    [fetchedProject, currentUserId, id, viewerId],
  );

  const {
    data: { onCreateComment: newComment } = {},
    error: commentsSubscriptionError,
  } = useSubscription<OnCreateCommentSubscription>(
    gql(onCreateComment),
    { client: currentUser ? client : unauthClient },
  );

  useEffect(
    () => {
      if (!newComment) return;
      setProject((prevProject) => {
        if (newComment.projectID !== prevProject.id) {
          return prevProject;
        }
        return {
          ...prevProject,
          comments: {
            ...prevProject.comments,
            items: [...prevProject.comments.items, newComment],
          },
        };
      });

      if (viewer.current?.id === newComment.creator.id) {
        newCommentRef.current?.scrollIntoView();
      }
    },
    [newComment],
  );

  useEffect(
    () => {
      if (!commentsSubscriptionError) return;
      setFlash('Messaging may be unavailable. Try reloading the page.');
      logger.error('Project: error subscribing to onCreateComment', { error: commentsSubscriptionError });
    },
    [commentsSubscriptionError],
  );

  useEffect(() => {
    setViewerId(token || localStorage.getItem('viewerId'));
    if (token) {
      localStorage.setItem('viewerId', token as string);
    }
  }, [currentUser, token]);

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

  const { quotes, clients = {}, freelancers, assets } = project || {};

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

export default WithAuthentication(memo(ProjectPage), { routeType: RouteType.NO_REDIRECT });
