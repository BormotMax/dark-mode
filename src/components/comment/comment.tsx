import React, { useState } from 'react';
import classnames from 'classnames';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/pro-regular-svg-icons';
import Linkify from 'react-linkify';
import { Avatar } from '../avatar/avatar';
import { createComment } from '../../graphql/mutations';
import { Comment as CommentType } from '../../types/custom';
import { CommentResourceType } from '../../API';
import { unauthClient } from '../../pages/_app';
import { useLogger } from '../../hooks';
import { QuoteForComment } from './quoteForComment';

import styles from './comment.module.scss';

interface CommentWrapperProps {
  comment: CommentType;
  viewerId?: string;
}

interface CommentProps {
  name?: string;
  title?: string;
  createdAt?: string;
  email?: string;
  isMine?: boolean;
  backgroundColor?: string;
  commentColor?: string;
  noAvatar?: boolean;
  s3key?: string;
}

interface NewCommentProps {
  name?: string;
  title?: string;
  email?: string;
  projectID: string;
  creatorID: string;
  s3key: string;
}

const getComponent = (comment: CommentType) => {
  switch (comment.includedResourceType) {
    case CommentResourceType.QUOTE:
      return <QuoteForComment id={comment.includedResourceID} />;
    default:
      return null;
  }
};

const getRelativeTime = (createdAt: Date) => {
  const now = new Date();
  const secondsElapsed = (now.getTime() - createdAt.getTime()) / 1000;
  const minutesElapsed = secondsElapsed / 60;
  const hoursElapsed = minutesElapsed / 60;
  const daysElapsed = hoursElapsed / 24;

  if (minutesElapsed < 91) {
    return `${String(Math.floor(minutesElapsed))} minutes ago`;
  }

  if (hoursElapsed < 24) {
    return `${String(Math.floor(hoursElapsed))} hours ago`;
  }

  if (daysElapsed < 2) {
    return 'Yesterday';
  }

  if (daysElapsed < 4) {
    return `${String(Math.floor(daysElapsed))} days ago`;
  }

  return createdAt.toLocaleDateString();
};

export const CommentWrapper: React.FC<CommentWrapperProps> = ({ comment, viewerId }) => (
  <Comment
    name={comment.creator.name}
    title={comment.creator?.title}
    createdAt={comment.createdAt}
    email={comment.creator.email}
    s3key={comment.creator.avatar?.key ?? ''}
    isMine={comment.creator.signedOutAuthToken === viewerId || comment.creator.id === viewerId}
  >
    <>
      <Linkify>
        <div>{comment.content}</div>
      </Linkify>
      {comment.includedResourceID && comment.includedResourceType && <div>{getComponent(comment)}</div>}
    </>
  </Comment>
);

// eslint-disable-next-line object-curly-newline
export const Comment: React.FC<CommentProps> = ({
  name,
  title,
  createdAt,
  email,
  children,
  isMine = true,
  backgroundColor = '#eeeeee',
  commentColor,
  noAvatar,
  s3key,
}) => (
  <div
    className={classnames(styles.comment, {
      [styles.commentDark]: !isMine,
      [styles.commentLight]: isMine,
    })}
    style={commentColor ? { background: commentColor } : {}}
  >
    <div className={styles.header}>
      <div className={styles.name}>
        {name}
        {title && <span className={styles.title}>, {title}</span>}
      </div>
      {createdAt && <div className={styles.createdTime}>{getRelativeTime(new Date(createdAt))}</div>}
    </div>
    {!noAvatar && (
      <Avatar
        className={styles.avatar}
        style={{ borderColor: backgroundColor }}
        email={email}
        name={name}
        width={48}
        height={48}
        s3key={s3key}
      />
    )}
    <div className={classnames(styles.commentContent)}>{children}</div>
  </div>
);

export const NewComment: React.FC<NewCommentProps> = ({ name, email, title, projectID, creatorID, s3key }) => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const { logger } = useLogger();

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleCreateComment = async (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      if (saving || content.trim() === '') return;
      setSaving(true);

      const input = {
        projectID,
        creatorID,
        content,
      };

      try {
        await unauthClient.mutate({
          mutation: gql(createComment),
          variables: { input },
        });

        setContent('');
      } catch (error) {
        logger.error('NewComment: error creating comment', { error, input });
      } finally {
        setSaving(false);
      }
    }
  };

  const handleEnter = (e) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      e.keyCode = undefined;
      handleCreateComment(e);
    }
  };

  return (
    <Comment s3key={s3key ?? ''} name={name} email={email} title={title} isMine>
      <textarea
        onChange={handleChange}
        onKeyPress={handleEnter}
        value={content}
        className={styles.commentText}
        name="content"
        id="content"
        rows={4}
      />
      <div className={styles.commentBar}>
        <span
          className={classnames({ [styles.isLoading]: saving })}
          role="button"
          tabIndex={0}
          onKeyDown={handleCreateComment}
          onClick={handleCreateComment}
        >
          <FontAwesomeIcon size="1x" color="#4F4F4F" icon={faArrowCircleRight} />
        </span>
      </div>
    </Comment>
  );
};
