import { Role } from '../withAuthentication';
import { useCurrentUser } from '../../hooks';

interface ProtectedProps {
  roles: Array<Role>;
}

export const Protected: React.FC<ProtectedProps> = ({ roles, children }) => {
  const { currentUser } = useCurrentUser();
  const currentUserRoles = currentUser?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];
  const intersection = currentUserRoles.filter((x) => roles.includes(x));

  if (intersection.length === 0 && !currentUserRoles.includes(Role.ADMIN)) {
    return null;
  }

  return <>{children}</>;
};
