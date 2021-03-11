import React, { memo } from 'react';
import Linkify from 'react-linkify';
import classnames from 'classnames';

import { ProjectComment } from '../../types/custom';
import { CommentResourceType } from '../../API';

import { QuoteForComment } from './quoteForComment';
import CommentLayout from './commentLayout';
import styles from './comment.module.scss';

const getComponent = (comment: ProjectComment) => {
  switch (comment.includedResourceType) {
    case CommentResourceType.QUOTE:
      return <QuoteForComment id={comment.includedResourceID} />;
    default:
      return null;
  }
};

const LARGE_COMMENT_SIZE = 85;

type CommentProps = {
  comment: ProjectComment,
  viewerId: string,
  showInfo?: boolean,
  isLast?: boolean,
};

export const Comment = memo<CommentProps>(({
  comment,
  viewerId,
  showInfo = false,
  isLast = false,
  ...rest
}): JSX.Element => {
  const hasIncludedResource = comment.includedResourceID && comment.includedResourceType;
  const commentIsLarge = comment.content.length > LARGE_COMMENT_SIZE;

  return (
    <CommentLayout
      name={comment.creator.name}
      createdAt={comment.createdAt}
      email={comment.creator.email}
      s3key={comment.creator.avatar?.key ?? ''}
      fluid={commentIsLarge}
      largeSize={commentIsLarge}
      showInfo={showInfo}
      isLast={isLast}
      contentClassName={classnames({ [styles.flexColumn]: hasIncludedResource })}
      {...rest}
    >
      <>
        <Linkify>
          <div>{comment.content}</div>
        </Linkify>
        {hasIncludedResource && <div className={styles.resourceWrapper}>{getComponent(comment)}</div>}
      </>
    </CommentLayout>
  );
});

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
          <FontAwesomeIcon size="1x" icon={faCircleArrowRight} />
        </span>
      </div>
    </Comment>
  );
});

Comment.displayName = 'Comment';