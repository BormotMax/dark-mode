import { Role } from '../withAuthentication';
import { useCurrentUser } from '../../hooks';

interface ProtectedProps {
  roles: Array<Role>;
  user: any;
}

export const Protected: React.FC<ProtectedProps> = ({ roles, user, children }) => {
  // const { currentUser } = useCurrentUser();
  console.log(user);
  const currentUserRoles = user?.signInUserSession?.accessToken?.payload['cognito:groups'] || [];
  const intersection = currentUserRoles.filter((x) => roles.includes(x));

  if (intersection.length === 0 && !currentUserRoles.includes(Role.ADMIN)) {
    return null;
  }

  return <>{children}</>;
};
