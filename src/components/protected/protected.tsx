import { Role } from '../withAuthentication';
import { useCurrentUser } from '../../hooks';

interface ProtectedProps {
  roles: Role[];
}

export const isAllowed = (user, roles: Role[]) => {
  const currentUserRoles = user?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];
  const intersection = currentUserRoles.filter((x) => roles.includes(x));
  const allowed = !(intersection.length === 0 && !currentUserRoles.includes(Role.ADMIN));
  return allowed;
};

export const Protected: React.FC<ProtectedProps> = ({ roles, children }) => {
  const { currentUser } = useCurrentUser();

  if (!isAllowed(currentUser, roles)) {
    return null;
  }

  return <>{children}</>;
};

// This component will return null if the passed in roles are allowed.
// It can be used when you want to return an alternative component for when
// a user is not allowed to see a Protected component
export const ProtectedElse: React.FC<ProtectedProps> = ({ roles, children }) => {
  const { currentUser } = useCurrentUser();

  if (isAllowed(currentUser, roles)) {
    return null;
  }

  return <>{children}</>;
};
