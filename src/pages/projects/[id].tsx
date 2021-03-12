import React, { useEffect, useRef, useState, useMemo, memo, useCallback } from 'react';
import Router, { useRouter } from 'next/router';
import classnames from 'classnames';
import { useSubscription, useQuery, gql, useReactiveVar } from '@apollo/client';

import { WithAuthentication, RouteType } from '../../components/withAuthentication';
import { getProject } from '../../graphql/queries';
import { Project, ProjectRelatedClient, ProjectRelatedFreelancer, ProjectComment, AuthProps, Page } from '../../types/custom';
import { unauthClient, client } from '../_app';
import { GetProjectQuery, CommentResourceType, OnCreateCommentSubscription } from '../../API';
import { useFlash, useLogger, useWindowSize } from '../../hooks';
import { onCreateComment } from '../../graphql/subscriptions';
import PageLayout, { alternatePageViewVar } from '../../components/pageLayout';
import { CurrentProjectAction, useCurrentProject } from '../../hooks/useCurrentProject';
import ProjectMenu from '../../components/projectMenu';
import FilterBar from '../../components/filterBar';
import ProjectFeed from '../../components/projectFeed';
import styles from '../styles/project.module.scss';
import { MOBILE_LAYOUT_BREAKPOINT } from '../../helpers/constants';

enum ProjectTabsEnum {
  Recent = 'Recent',
  All = 'All',
  Proposals = 'Proposals',
}

const RECENT_COMMENTS_COUNT = 20;
const getTabName = (name: string, length: number) => (length ? `${name} - ${length}` : name);

const ProjectPage: React.FC<AuthProps> = ({ currentUser }) => {
  const router = useRouter();
  const { id, token } = router.query;
  const projectId = Array.isArray(id) ? id[0] : id;

  const { currentProjectDispatch } = useCurrentProject();
  const { setFlash, setDelayedFlash } = useFlash();
  const { logger } = useLogger();
  const [project, setProject] = useState<Project>(null);
  const [projectTab, setProjectTab] = useState<ProjectTabsEnum>(ProjectTabsEnum.All);
  const [viewerId, setViewerId] = useState(token || localStorage.getItem('viewerId'));
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const viewer = useRef<ProjectRelatedClient['user'] | ProjectRelatedFreelancer['user']>(null);
  const projectViewer = useRef<ProjectRelatedClient | ProjectRelatedFreelancer>(null);
  const newCommentRef = useRef<HTMLDivElement>(null);

  const alternatePageView = useReactiveVar(alternatePageViewVar);

  const currentUserId = currentUser?.attributes?.sub;

  const windowSize = useWindowSize();
  const isDesktop = useMemo(
    () => (windowSize.width > MOBILE_LAYOUT_BREAKPOINT),
    [windowSize.width],
  );

  useEffect(() => () => {
    currentProjectDispatch({ type: CurrentProjectAction.RESET });
  }, []);

  const {
    data: { getProject: fetchedProject } = {},
    refetch: fetchProject,
  } = useQuery<GetProjectQuery>(
    gql(getProject),
    {
      skip: !projectId,
      variables: { id: projectId },
      client: unauthClient,
      onError(error) {
        setFlash("There was an error retrieving this project. We're looking into it.");
        logger.error('Project: error retrieving Project.', { error, input: { id: projectId } });
        setLoading(false);
      },
    },
  );

  useEffect(
    () => {
      if (!fetchedProject) return;
      // determineViewer
      const { clients, freelancers } = fetchedProject;
      const viewingClientItem = clients.items
        .find((viewerClient) => viewerId && viewerClient?.user?.signedOutAuthToken === viewerId);
      const viewingFreelancerItem = freelancers.items
        .find((freelancer) => currentUserId && freelancer?.user?.id === currentUserId);

      const viewerCandidate = viewingFreelancerItem?.user
        ? viewingFreelancerItem
        : viewingClientItem;

      if (!viewingFreelancerItem?.user && viewingClientItem?.user && currentUserId) {
        logger.info('Project: signed in user acting as a client', { info: { id: projectId, viewerId, currentUserId } });
        setDelayedFlash("You can't view a project as a client while signed in as a freelancer.");
        Router.push('/projects');
      }
      const user = viewerCandidate?.user;
      const projectUser = viewerCandidate;

      // set project
      setProject(fetchedProject);
      currentProjectDispatch({
        type: CurrentProjectAction.SET,
        payload: {
          viewer: user,
          project: fetchedProject,
        },
      });

      // set comments
      const projectComments = fetchedProject?.comments?.items || [];
      setComments([...projectComments].sort(
        (e1, e2) => new Date(e1?.createdAt).getTime() - new Date(e2?.createdAt).getTime(),
      ));

      viewer.current = user;
      projectViewer.current = projectUser;
      setLoading(false);
    },
    [fetchedProject, currentUserId, projectId, viewerId],
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
      if (!newComment || newComment.projectID !== projectId) return;
      setComments((prevState) => [...prevState, newComment]);
      if (viewer.current?.id === newComment.creator?.id) {
        newCommentRef.current?.scrollIntoView();
      }
    },
    [newComment, projectId],
  );

  useEffect(
    () => {
      if (!commentsSubscriptionError) return;
      setFlash('Messaging may be unavailable. Try reloading the page.');
      logger.error('Project: error subscribing to onCreateComment', { error: commentsSubscriptionError });
    },
    [commentsSubscriptionError],
  );

  useEffect(
    () => {
      setViewerId(token || localStorage.getItem('viewerId'));
      if (token) {
        localStorage.setItem('viewerId', token as string);
      }
    },
    [currentUser, token],
  );

  const handleFilterChange = useCallback(
    (filterOption) => {
      setProjectTab(filterOption);
    },
    [],
  );

  const filteredComments = useMemo(
    () => ({
      [ProjectTabsEnum.Recent]: comments.slice(0, RECENT_COMMENTS_COUNT),
      [ProjectTabsEnum.All]: comments,
      [ProjectTabsEnum.Proposals]: comments.filter(({ includedResourceType }) => (
        includedResourceType === CommentResourceType.QUOTE
      )),
    }),
    [comments],
  );

  const projectTabs = useMemo(
    () => ({
      [ProjectTabsEnum.Recent]: ProjectTabsEnum.Recent,
      [ProjectTabsEnum.All]: getTabName(ProjectTabsEnum.All, filteredComments.All.length),
      [ProjectTabsEnum.Proposals]: getTabName(ProjectTabsEnum.Proposals, filteredComments.Proposals.length),
    }),
    [filteredComments.Proposals.length, filteredComments.All.length],
  );

  const currentComments = useMemo(
    () => (filteredComments[projectTab]),
    [filteredComments, projectTab],
  );

  if (!viewerId && !currentUserId) {
    Router.push('/sign-in');
    return null;
  }
  if (!loading && !project) {
    return <div>Not found</div>;
  }
  if (!loading && !viewer.current) {
    logger.info('Project: no viewer on Projects space', { info: { id: projectId, viewerId, currentUserId } });
    Router.push('/sign-in');
    return null;
  }

  const { quotes, clients = {}, freelancers, assets } = project || {};
  const showMenu = project && (isDesktop || alternatePageView);

  return (
    <PageLayout hasAlternateView page={Page.PROJECT}>
      <>
        {!alternatePageView && (
          <FilterBar
            options={projectTabs}
            current={projectTab}
            handleChange={handleFilterChange}
          />
        )}
        <div
          className={classnames(
            styles.columns,
            { [styles.center]: !currentUser?.attributes?.sub },
          )}
        >
          {!alternatePageView && (
            <div className={styles.leftColumn}>
              <ProjectFeed
                comments={currentComments}
                viewer={viewer}
                newCommentRef={newCommentRef}
                projectId={projectId}
              />
            </div>
          )}
          {showMenu && (
            <div
              className={classnames(
                styles.rightColumn,
                { [styles.alternatePageView]: alternatePageView },
              )}
            >
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
      </>
    </PageLayout>
  );
};

export default WithAuthentication(memo(ProjectPage), { routeType: RouteType.NO_REDIRECT });
