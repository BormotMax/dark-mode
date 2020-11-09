import React, { useState, CSSProperties } from 'react';
import classnames from 'classnames';
import md5 from 'md5';

import styles from './avatar.module.scss';

interface AvatarProps {
  url?: string;
  email?: string;
  name?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Get place holder background
 * @param{string} name
 * @return{string}
 */
const getBackgroundColor = (name: string): string => {
  if (!name) {
    return '#444444';
  }

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // eslint-disable-next-line no-bitwise
  const c = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return `#${'00000'.substring(0, 6 - c.length)}${c}`;
};

/**
 * Get place holder form username
 * @param{string} name
 * @return{string}
 */
export const avatarPlaceholderName = (name: string): string => {
  if (!name) {
    return 'UN';
  }

  const splitArr = name.split(' ').filter(Boolean);
  let shortName = '';
  splitArr.forEach((w) => {
    shortName += w[0].toUpperCase();
  });

  return shortName;
};

/**
 * Get gravatarUrl with email address
 * @return{string}
 */
const gravatarUrl = (emailAddress: string): string => {
  const e = emailAddress ? emailAddress.trim().toLowerCase() : '';
  return `https://www.gravatar.com/avatar/${md5(e)}?d=null`;
};

// Use the url if given, else use the email to get the gravatar, else show custom placeholder
export const Avatar: React.FC<AvatarProps> = ({
  url,
  className,
  style,
  email,
  name,
  width = 72,
  height = 72,
}) => {
  const [imageError, setImageError] = useState(false);

  /**
   * Handle avatarImage load error
   * @return{*}
   */
  const onImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {!imageError ? (
        <img
          alt="avatar"
          className={classnames(styles.avatar, className)}
          src={url || (email ? gravatarUrl(email) : '/blankAvatar.jpg')}
          style={{ width, height, ...style }}
          onError={onImageError}
        />
      ) : (
        <div
          style={{
            width,
            height,
            fontSize: height / 2,
            lineHeight: `${height + 2}px`,
            background: getBackgroundColor(name || email),
            ...style,
          }}
          className={classnames(styles.avatar, styles.avatarPlaceholder, className)}
        >
          {avatarPlaceholderName(name || email)}
        </div>
      )}
    </>
  );
};
