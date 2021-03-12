import React, { memo } from 'react';

import { Role } from '../withAuthentication';
import { useCurrentUser } from '../../hooks';
import { Features, permissions } from '../../permissions';

interface ProtectedProps {
  feature: Features;
}

export const isAllowed = (user, feature: Features): boolean => {
  const currentUserRoles = user?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];
  const intersection = feature in permissions ? permissions[feature].filter((roles) => currentUserRoles.includes(roles)) : [];
  const allowed = !(intersection.length === 0 && !currentUserRoles.includes(Role.ADMIN));
  return allowed;
};

export const Protected: React.FC<ProtectedProps> = memo(({ feature, children }) => {
  const { currentUser } = useCurrentUser();

  if (!isAllowed(currentUser, feature)) {
    return null;
  }

  return <>{children}</>;
});
Protected.displayName = 'Protected';

// This component will return null if the passed in roles are allowed.
// It can be used when you want to return an alternative component for when
// a user is not allowed to see a Protected component
export const ProtectedElse: React.FC<ProtectedProps> = memo(({ feature, children }) => {
  const { currentUser } = useCurrentUser();

  if (isAllowed(currentUser, feature)) {
    return null;
  }

  return <>{children}</>;
});
ProtectedElse.displayName = 'ProtectedElse';
