import React, { useState, CSSProperties, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import classnames from 'classnames';

import { useLogger } from '../../hooks';
import styles from './avatar.module.scss';
import { gravatarUrl } from '../../helpers/gravatarUrl';

interface AvatarProps {
  url?: string;
  s3key?: string;
  email?: string;
  name?: string;
  width?: number;
  height?: number;
  className?: string;
  defaultImage?: string;
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

// Use the url if given, else use the email to get the gravatar, else show custom placeholder
export const Avatar: React.FC<AvatarProps> = ({
  url: urlProp = '',
  s3key = '',
  className,
  style,
  email,
  name,
  width = 72,
  height = 72,
  defaultImage = '/blankAvatar.jpg',
}) => {
  const { logger } = useLogger();
  const [url, setUrl] = useState(urlProp);
  const [imageError, setImageError] = useState(false);

  const onImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    if (s3key) {
      try {
        Storage.get(s3key).then((image: string) => {
          setUrl(image);
        });
      } catch (error) {
        logger.error('Avatar: error retrieving s3 image.', { error, input: s3key });
      }
    }
  }, [s3key]);

  return (
    <>
      {!imageError ? (
        <img
          alt="avatar"
          className={classnames(styles.avatar, className)}
          src={url || (email ? gravatarUrl(email) : defaultImage)}
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
