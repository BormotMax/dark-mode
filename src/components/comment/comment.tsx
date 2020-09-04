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
}

interface NewCommentProps {
  name?: string;
  avatarUrl?: string;
  projectID: string;
  creatorID: string;
}

export const CommentWrapper: React.FC<CommentWrapperProps> = ({ comment, avatarUrl, viewerId }) => (
  <Comment
    name={comment.creator.name}
    createdAt={comment.createdAt}
    avatarUrl={avatarUrl || gravatarUrl(comment.creator.email)}
    isMine={comment.creator.id === viewerId}
  >
    <div>{comment.content}</div>
  </Comment>
);

// eslint-disable-next-line object-curly-newline
export const Comment: React.FC<CommentProps> = ({ name, createdAt, avatarUrl, children, isMine = true }) => (
  <div
    className={classnames(styles.comment, {
      [styles.commentDark]: !isMine,
      [styles.commentLight]: isMine,
    })}
  >
    <div className={styles.header}>
      <div className="text-2 text-normal text-blue">{name}</div>
      {createdAt && <div className="text-2 text-small text-gray">{new Date(createdAt).toDateString()}</div>}
    </div>
    <img alt="avatar" className={styles.avatar} src={avatarUrl || '/blankAvatar.jpg'} />
    <div className={classnames(styles.commentContent, 'text-2', 'text-gray')}>{children}</div>
  </div>
);

export const NewComment: React.FC<NewCommentProps> = ({ name, avatarUrl, projectID, creatorID }) => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleCreateComment = async (e: any) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      if (saving || content.trim() === '') return;
      setSaving(true);

      try {
        await unauthClient.mutate({
          mutation: gql(createComment),
          variables: {
            input: {
              commentProjectId: projectID,
              creatorID,
              content,
            },
          },
        });

        setContent('');
      } catch (err) {
        console.log(err);
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
    <Comment name={name} avatarUrl={avatarUrl} isMine>
      <textarea
        onChange={handleChange}
        onKeyPress={handleEnter}
        value={content}
        className={styles.commentText}
        name="content"
        id="content"
        rows={10}
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
