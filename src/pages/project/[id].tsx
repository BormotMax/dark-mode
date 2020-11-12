import React, { useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { faBackpack, faClipboardUser, faFileAlt, faSackDollar, faStopwatch } from '@fortawesome/pro-light-svg-icons';
import { FilesTab, NotesTab, TabGroup } from '../../components/tabs';
import { WithAuthentication, RouteType, Role } from '../../components/withAuthentication';
import { getProject } from '../../graphql/queries';
import { Project, Comment as CommentType, AuthProps } from '../../types/custom';
import { unauthClient } from '../_app';
import { GetProjectQuery, CommentResourceType } from '../../API';
import { useFlash, useLogger } from '../../hooks';
import { CommentWrapper, NewComment } from '../../components/comment';
import { onCreateComment } from '../../graphql/subscriptions';
import { PageLayoutOne } from '../../components/pageLayoutOne';
import styles from '../styles/project.module.scss';
import { Page } from '../../components/nav/nav';
import { ContactPreview } from '../../components/contactPreview';
import { AddQuoteModal } from '../../components/addQuoteModal';
import { Protected, ProtectedElse } from '../../components/protected/protected';
import { QuoteProgress } from '../../components/quote';
import { isClickOrEnter } from '../../helpers/util';

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

  useEffect(() => {
    setViewerId(token || localStorage.getItem('viewerId'));
    if (token) {
      localStorage.setItem('viewerId', token as string);
    }
  }, [currentUser]);

  const determineViewer = (p) => {
    let viewerCandidate;
    const { clients, freelancers } = p as Project;
    const viewingClientItem = clients.items.find((c) => viewerId && c.user.signedOutAuthToken === viewerId);
    const viewingFreelancerItem = freelancers.items.find((f) => currentUserId && f.user.id === currentUserId);

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
    const getProjectInput = { id };
    try {
      const getProjectResult: { data: GetProjectQuery } = await unauthClient.query({
        query: gql(getProject),
        variables: getProjectInput,
      });

      const p: Project = getProjectResult.data?.getProject;
      const { user, projectUser } = determineViewer(p);
      setProject(p);
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
    const execute = async () => {
      fetchProject();

      try {
        const subscriptionResult = unauthClient.subscribe({ query: gql(onCreateComment) });
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
  }, []);

  const handleFilterChange = (e, filterOption) => {
    if (isClickOrEnter(e)) {
      setProjectTab(filterOption);
    }
  };

  if (!viewerId && !currentUserId) Router.push('/signIn');
  if (loading) return null;
  if (!project) return <div>Not found</div>;

  const { comments: cs, quotes, clients, assets } = project as Project;

  if (!viewer.current) {
    logger.info('Project: no viewer on Projects space', { info: { id, viewerId, currentUserId } });
    Router.push('/signIn');
    return null;
  }

  // eslint-disable-next-line arrow-body-style
  const comments = (cs?.items || []).sort((e1, e2) => {
    return new Date(e1.createdAt).getTime() - new Date(e2.createdAt).getTime();
  }) as Array<CommentType>;

  const projectTabOptions = {
    [ProjectTabsEnum.Recent]: {
      header: 'Recent',
      filterFxn: (_item, idx: number) => idx < 20,
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
      headerText={<>{project.title || project.clients.items.find((i) => i.isInitialContact)?.user.name || 'Title'}</>}
      headerContainer={styles.headerContainer}
      layoutContainer={styles.layoutContainer}
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
      <div className={classnames('column', styles.hideTablet, styles.rightColumn)}>
        <RightColumn
          viewer={viewer}
          clients={clients}
          project={project}
          fetchProject={fetchProject}
          currentUserId={currentUserId}
          assets={assets}
          quotes={quotes}
        />
      </div>
      <Filters projectTabOptions={projectTabOptions} projectTab={projectTab} handleFilterChange={handleFilterChange} />
      <div className={classnames('container', 'columns', styles.hideMobile, styles.desktopColumns, { [styles.center]: !currentUser?.attributes?.sub } )}>
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
        <div className={classnames('column', styles.rightColumn)}>
          <RightColumn
            viewer={viewer}
            clients={clients}
            project={project}
            fetchProject={fetchProject}
            currentUserId={currentUserId}
            assets={assets}
            quotes={quotes}
          />
        </div>
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

const Feed = ({ comments, projectTabOptions, projectTab, viewer, newCommentRef, id }) => (
  <>
    {comments.filter(projectTabOptions[projectTab].filterFxn).map((comment) => (
      <CommentWrapper
        key={comment.id}
        comment={comment}
        viewerId={viewer.current.id as string}
      />
    ))}
    <div ref={newCommentRef}>
      <NewComment
        name={viewer.current.name}
        email={viewer.current.email}
        title={viewer.current.title}
        projectID={id as string}
        creatorID={viewer.current.id}
      />
    </div>
  </>
);

const RightColumn = ({ viewer, clients, project, fetchProject, currentUserId, assets, quotes }) => (
  <div className={classnames(styles.tabGroupWrapper)}>
    <Protected roles={[Role.FREELANCER]}>
      <TabGroup
        tabInfos={[
          { icon: faClipboardUser, header: 'People' },
          { icon: faFileAlt, header: 'Notes' },
          { icon: faBackpack, header: 'Assets' },
        ]}
      >
        <ContactPreview currentUser={viewer.current} users={clients.items} projectID={project.id} refreshUsers={fetchProject} />
        <NotesTab
          projectUser={project.freelancers.items.find((f) => currentUserId && f.user.id === currentUserId)}
          refetchData={fetchProject}
        />
        <FilesTab projectID={project.id} files={assets.items} refetchData={fetchProject} />
      </TabGroup>
    </Protected>
    <ProtectedElse roles={[Role.FREELANCER]}>
      <TabGroup
        tabInfos={[
          { icon: faClipboardUser, header: 'People' },
          { icon: faBackpack, header: 'Assets' },
        ]}
      >
        <ContactPreview currentUser={viewer.current} users={clients.items} projectID={project.id} refreshUsers={fetchProject} />
        <FilesTab projectID={project.id} files={assets.items} refetchData={fetchProject} />
      </TabGroup>
    </ProtectedElse>
    <TabGroup
      tabInfos={[
        { icon: faStopwatch, header: 'Tasks & Time' },
        { icon: faSackDollar, header: 'Financial' },
      ]}
    >
      <>
        {quotes.items.length === 0 ? (
          <div>There are no quotes, yet.</div>
        ) : (
          quotes.items
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((quote, i) => <QuoteProgress key={quote.id} i={i + 1} quote={quote} refetchData={fetchProject} />)
        )}
      </>
      <AddQuoteModal quotes={quotes.items} projectID={project.id} refetchData={fetchProject} creator={viewer.current} />
    </TabGroup>
  </div>
);

export default WithAuthentication(ProjectPage, { routeType: RouteType.NO_REDIRECT });
