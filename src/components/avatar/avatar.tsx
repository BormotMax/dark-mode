import React, { CSSProperties, useMemo } from 'react';
import Storage from '@aws-amplify/storage';
import classnames from 'classnames';

import { useLogger } from '../../hooks';
import { getGravatarImage } from '../../helpers/gravatarUrl';
import useAsync from '../../hooks/useAsync';

import styles from './avatar.module.scss';

interface AvatarProps {
  url?: string;
  s3key?: string;
  email?: string;
  name?: string;
  width?: number;
  height?: number;
  className?: string;
  userIsLoading?: boolean;
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
  const arrLength = splitArr.length;

  let shortName = '';
  if (arrLength) {
    const [firstName] = splitArr;
    const lastName = splitArr[arrLength - 1];

    shortName = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  return shortName;
};

// Use the url if given, else use the email to get the gravatar, else show custom placeholder
export const Avatar: React.FC<AvatarProps> = ({
  userIsLoading = false,
  s3key = '',
  className,
  style,
  email,
  name,
  width = 72,
  height = 72,
}) => {
  const { logger } = useLogger();

  const { value: s3url = '', loading: s3Loading } = useAsync(async () => {
    try {
      if (!s3key) {
        return '';
      }
      const image = await Storage.get(s3key) as string;
      return image || '';
    } catch (error) {
      logger.error('Avatar: error retrieving s3 image.', { error, input: s3key });
      return '';
    }
  }, [s3key, logger]);

  const { value: gravatarImage, loading: gravatarLoading } = useAsync(async () => {
    try {
      // only if user have no avatar from s3
      if (userIsLoading || s3key) {
        return '';
      }
      const image = await getGravatarImage(email);
      return image ? URL.createObjectURL(image) : '';
    } catch (error) {
      return '';
    }
  }, [s3key, email, userIsLoading, logger]);

  const url = useMemo(
    () => (s3url || gravatarImage || ''),
    [gravatarImage, s3url],
  );

  const avatarStyle = useMemo(
    () => ({ width, height, ...style }),
    [width, height, style],
  );
  const avatarPlaceholderStyle = useMemo(
    () => ({
      width,
      height,
      fontSize: height / 2,
      lineHeight: `${height + 2}px`,
      background: getBackgroundColor(name || email),
      ...style,
    }),
    [width, height, style, name, email],
  );

  const isLoading = userIsLoading || (s3key ? s3Loading : gravatarLoading);
  const showImage = isLoading || url;

  if (showImage) {
    return (
      <img
        alt="avatar"
        className={classnames(
          styles.avatar,
          { [styles.loading]: isLoading },
          className,
        )}
        src={url}
        style={avatarStyle}
      />
    );
  }

  return (
    <div
      style={avatarPlaceholderStyle}
      className={classnames(styles.avatar, styles.avatarPlaceholder, className)}
    >
      {avatarPlaceholderName(name || email)}
    </div>
  );
};
