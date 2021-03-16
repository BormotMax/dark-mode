import React, { memo } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/pro-regular-svg-icons';

import { Avatar } from '../avatar/avatar';

import styles from './comment.module.scss';

const getDate = (createdAtEpoch: string) => {
  const createdAt = new Date(createdAtEpoch);
  const dateString = createdAt.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return dateString.replace(/( AM)|( PM)/g, (match) => {
    if (match === ' AM') return 'am';
    return 'pm';
  });
};

type CommentProps = {
  name?: string,
  createdAt?: string,
  email?: string,
  backgroundColor?: string,
  commentColor?: string,
  noAvatar?: boolean,
  s3key?: string,
  children: React.ReactNode,
  showInfo?: boolean,
  hasDetails?: boolean,
  fluid?: boolean,
  noPaddings?: boolean,
  isLast?: boolean,
  largeSize?: boolean,
  contentClassName?: string,
};

const CommentLayout = memo<CommentProps>(({
  name = '',
  createdAt = '',
  email = '',
  s3key = '',
  showInfo = false,
  hasDetails = true,
  isLast = false,
  largeSize = false,
  fluid = false,
  noPaddings = false,
  contentClassName = '',
  children,
}): JSX.Element => (
  <>
    {showInfo && (
      <div className={styles.info}>
        {`${name}, ${createdAt ? getDate(createdAt) : ''}`}
      </div>
    )}
    <div className={styles.content}>
      {isLast && (
        <Avatar
          className={styles.avatar}
          email={email}
          name={name}
          width={36}
          height={36}
          s3key={s3key}
        />
      )}
      <div
        className={classnames(
          styles.contentWrapper,
          contentClassName,
          {
            [styles.groupComment]: !isLast,
            [styles.lastComment]: isLast,
            [styles.contentWrapperPaddingsLarge]: largeSize,
            [styles.noPaddings]: noPaddings,
            [styles.fluid]: fluid,
            [styles.fit]: !fluid,
          },
        )}
      >
        {children}
        {hasDetails && (
          <button
            className={classnames('defaultButton', styles.optionsButton)}
            type="button"
            tabIndex={0}
          >
            <FontAwesomeIcon size="1x" icon={faEllipsis} />
          </button>
        )}
      </div>
    </div>
  </>
));

CommentLayout.displayName = 'CommentLayout';

export default CommentLayout;
