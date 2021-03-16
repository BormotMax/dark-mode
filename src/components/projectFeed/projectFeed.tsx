import React, { memo, useMemo, Fragment } from 'react';

import { ProjectComment, ProjectRelatedClient, ProjectRelatedFreelancer } from '../../types/custom';
import { Comment, CommentInput } from '../comment';

import styles from './projectFeed.module.scss';

const HOUR = 3600;
const getCommentsGroups = (comments: ProjectComment[]) => {
  let groupCounter = 0;
  let lastGroupCreatedAt;
  let lastCreatorId;
  return comments.reduce<Array<ProjectComment[]>>(
    (acc, item, index) => {
      const createdAt = Math.round(new Date(item.createdAt).getTime() / 1000);
      if (index === 0) {
        lastGroupCreatedAt = createdAt;
        lastCreatorId = item.creatorID;
      }

      const newGroupTimeCondition = (createdAt - lastGroupCreatedAt) >= HOUR;
      const newGroupAuthorCondition = lastCreatorId !== item.creatorID;
      if (newGroupTimeCondition || newGroupAuthorCondition) {
        lastGroupCreatedAt = createdAt;
        groupCounter += 1;
      }

      if (acc[groupCounter]) {
        acc[groupCounter].push(item);
      } else {
        acc[groupCounter] = [item];
      }
      return acc;
    },
    [],
  );
};

type ProjectFeedProps = {
  comments: ProjectComment[],
  viewer: React.MutableRefObject<ProjectRelatedClient['user'] | ProjectRelatedFreelancer['user']>,
  newCommentRef: React.Ref<HTMLDivElement>,
  projectId: string,
};

const ProjectFeed = ({
  comments,
  viewer,
  newCommentRef,
  projectId,
}: ProjectFeedProps) => {
  const currentViewer = viewer?.current;

  const commentsGroups = useMemo(
    () => getCommentsGroups(comments),
    [comments],
  );

  if (!currentViewer) {
    return null;
  }

  return (
    <div className={styles.container}>
      {commentsGroups.map((commentsGroup) => (
        <Fragment key={commentsGroup[0].id}>
          {commentsGroup.map(((comment, index) => (
            <Comment
              key={comment.id}
              showInfo={index === 0}
              isLast={index === commentsGroup.length - 1}
              comment={comment}
              viewerId={currentViewer.id}
            />
          )))}
        </Fragment>
      ))}
      <div ref={newCommentRef}>
        <CommentInput
          email={currentViewer.email}
          projectID={projectId}
          creatorID={currentViewer.id}
          s3key={currentViewer.avatar?.key ?? ''}
        />
      </div>
    </div>
  );
};

export default memo(ProjectFeed);
