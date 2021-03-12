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

Comment.displayName = 'Comment';