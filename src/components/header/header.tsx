import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import classnames from 'classnames';

import { Protected } from '../protected/protected';
import { Features } from '../../permissions';
import { GetUserQuery } from '../../API';
import { getUser } from '../../graphql/queries';
import { useCurrentUser, useLogger } from '../../hooks';
import { Avatar } from '../avatar/avatar';
import Breadcrumbs from '../breadcrumbs';
import DoubleArrow from '../svgIcons/DoubleArrow';

import styles from './header.module.scss';

const USER_AVATAR_SIZE = 48;

type Props = {
  onClickCollapseButton?: () => void,
  navIsCollapsed?: boolean,
};

export const Header: React.FC<Props> = React.memo(({
  children,
  onClickCollapseButton = () => {},
  navIsCollapsed,
}) => {
  const { currentUser } = useCurrentUser();
  const { logger } = useLogger();
  const userId = currentUser?.attributes?.sub;
  const email = currentUser?.attributes?.email;

  const {
    data: userAvatarResponse,
    loading: s3AvatarIsLoading,
  } = useQuery<GetUserQuery>(
    gql(getUser),
    {
      variables: { id: userId },
      skip: !userId,
      onError(error) {
        logger.error('Header: error get user', { error, input: { id: userId } });
      },
    },
  );
  const userAvatarS3Key = React.useMemo(
    () => (userAvatarResponse?.getUser?.avatar?.key) ?? '',
    [userAvatarResponse],
  );

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        {children
          ? <Protected feature={Features.Header}>{children}</Protected>
          : (
            <>
              <div className={styles.avatarWrapper}>
                <Avatar
                  s3AvatarIsLoading={s3AvatarIsLoading}
                  s3key={userAvatarS3Key}
                  email={email}
                  name={name}
                  width={USER_AVATAR_SIZE}
                  height={USER_AVATAR_SIZE}
                />
              </div>
              <Protected feature={Features.DesktopNav}>
                <DoubleArrow
                  onClick={onClickCollapseButton}
                  className={classnames(
                    styles.arrow,
                    { [styles.arrowCollapsed]: navIsCollapsed },
                    { [styles.arrowExpanded]: !navIsCollapsed },
                  )}
                />
              </Protected>
              <Breadcrumbs />
            </>
          )}
      </div>
    </div>
  );
});
