import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/pro-regular-svg-icons';
import { useState } from 'react';
import gql from 'graphql-tag';
import styles from './comment.module.scss';
import { Comment as CommentType } from '../../types/custom';
import { gravatarUrl } from '../../helpers/gravatarUrl';
import { unauthClient } from '../../pages/_app';
import { createComment } from '../../graphql/mutations';
import { useLogger } from '../../hooks';

const BACKGROUND_COLOR = '#f4f3ee';

interface CommentWrapperProps {
  comment: CommentType;
  avatarUrl?: string;
  viewerId?: string;
}

interface CommentProps {
  name?: string;
  createdAt?: string;
  avatarUrl?: string;
  isMine?: boolean;
  backgroundColor?: string;
}

interface NewCommentProps {
  name?: string;
  avatarUrl?: string;
  projectID: string;
  creatorID: string;
}

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

export const CommentWrapper: React.FC<CommentWrapperProps> = ({ comment, avatarUrl, viewerId }) => (
  <Comment
    name={comment.creator.name}
    createdAt={comment.createdAt}
    avatarUrl={avatarUrl || gravatarUrl(comment.creator.email)}
    isMine={comment.creator.signedOutAuthToken === viewerId || comment.creator.id === viewerId}
    backgroundColor={BACKGROUND_COLOR}
  >
    <div>{comment.content}</div>
  </Comment>
);

// eslint-disable-next-line object-curly-newline
export const Comment: React.FC<CommentProps> = ({ name, createdAt, avatarUrl, children, isMine = true, backgroundColor = 'white' }) => (
  <div
    className={classnames(styles.comment, {
      [styles.commentDark]: !isMine,
      [styles.commentLight]: isMine,
    })}
  >
    <div className={styles.header}>
      <div>{name}</div>
      {createdAt && <div className="text-2 text-small text-gray">{getRelativeTime(new Date(createdAt))}</div>}
    </div>
    <img alt="avatar" className={styles.avatar} style={{ borderColor: backgroundColor }} src={avatarUrl || '/blankAvatar.jpg'} />
    <div className={classnames(styles.commentContent)}>{children}</div>
  </div>
);

export const NewComment: React.FC<NewCommentProps> = ({ name, avatarUrl, projectID, creatorID }) => {
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
    <Comment name={name} avatarUrl={avatarUrl} isMine backgroundColor={BACKGROUND_COLOR}>
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
