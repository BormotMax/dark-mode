import Router, { useRouter } from 'next/router';
import gql from 'graphql-tag';
import classnames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FilesTab, NotesTab, TabGroup } from '../../components/tabs';
import { WithAuthentication, RouteType, Role } from '../../components/withAuthentication';
import { getProject } from '../../graphql/queries';
import { Project, Comment as CommentType, AuthProps, User } from '../../types/custom';
import { unauthClient } from '../_app';
import { GetProjectQuery } from '../../API';
import { useFlash, useLogger } from '../../hooks';
import { CommentWrapper, NewComment } from '../../components/comment';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { onCreateComment } from '../../graphql/subscriptions';
import { PageLayoutOne } from '../../components/pageLayoutOne';
import styles from '../styles/project.module.scss';
import { Page } from '../../components/nav/nav';
import { ContactPreview } from '../../components/contactPreview';
import { AddQuoteModal } from '../../components/addQuoteModal';
import { Protected, ProtectedElse } from '../../components/protected/protected';
import { QuoteProgress } from '../../components/quote';

const ProjectPage: React.FC<AuthProps> = ({ currentUser }) => {
  const router = useRouter();
  const { id, token } = router.query;
  const [project, setProject] = useState(null);
  const [viewerId, setViewerId] = useState(token || localStorage.getItem('viewerId'));
  const viewer = useRef(null);
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
      viewerCandidate = viewingFreelancerItem.user;
    } else if (viewingClientItem?.user) {
      if (currentUserId) {
        logger.info('Project: signed in user acting as a client', { info: { id, viewerId, currentUserId } });
        setDelayedFlash("You can't view a project as a client while signed in as a freelancer.");
        Router.push('/projects');
      }
      viewerCandidate = viewingClientItem.user;
    }

    return viewerCandidate;
  };

  const fetchProject = async () => {
    const getProjectInput = { id };
    try {
      const getProjectResult: { data: GetProjectQuery } = await unauthClient.query({
        query: gql(getProject),
        variables: getProjectInput,
      });

      const p: Project = getProjectResult.data?.getProject;
      const v = determineViewer(p);
      setProject(p);
      viewer.current = v;
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

  if (!viewerId && !currentUserId) Router.push('/signIn');
  if (loading) return null;
  if (!project) return <div>Not found</div>;

  const { comments: cs, quotes, clients, assets } = project as Project;

  if (!viewer) {
    logger.info('Project: no viewer on Projects space', { info: { id, viewerId, currentUserId } });
    Router.push('/signIn');
    return null;
  }

  // eslint-disable-next-line arrow-body-style
  const comments = (cs?.items || []).sort((e1, e2) => {
    return new Date(e1.createdAt).getTime() - new Date(e2.createdAt).getTime();
  }) as Array<CommentType>;

  // /* todo: click to change title */
  return (
    <PageLayoutOne
      headerText={
        <>
          <Protected roles={[Role.FREELANCER]}>
            <Link href="/projects">
              <a href="/projects">Projects</a>
            </Link>
          </Protected>
          <ProtectedElse roles={[Role.FREELANCER]}>Projects</ProtectedElse>
          &nbsp;&gt;&nbsp;{project.title || project.clients.items.find((i) => i.isInitialContact)?.user.name || 'Title'}
        </>
      }
      page={Page.PROJECT}
    >
      <div className={classnames('columns')}>
        <div className={classnames('column', styles.commentWrapper)}>
          {comments.filter(Boolean).map((c) => (
            <CommentWrapper key={c.id} comment={c} viewerId={viewer.current.id as string} />
          ))}
          <div ref={newCommentRef}>
            <NewComment
              name={viewer.current.name}
              avatarUrl={gravatarUrl(viewer.current.email)}
              projectID={id as string}
              creatorID={viewer.current.id}
            />
          </div>
        </div>
        <div className={classnames('column', 'is-narrow', styles.rightColumn)}>
          <div className={classnames(styles.tabGroupWrapper)}>
            <TabGroup names={['People', 'Notes', 'Assets']}>
              <ContactPreview currentUser={viewer.current} users={clients.items} projectID={project.id} refreshUsers={fetchProject} />
              <NotesTab />
              <FilesTab projectID={project.id} files={assets.items} refetchData={fetchProject} />
            </TabGroup>
            <TabGroup names={['Tasks & Time', 'Financial']}>
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
        </div>
      </div>
    </PageLayoutOne>
  );
};

export default WithAuthentication(ProjectPage, { routeType: RouteType.NO_REDIRECT });
