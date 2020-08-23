import Link from 'next/link';
import { WithAuthentication, RouteType } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';

const Dashboard: React.FC<AuthProps> = ({ signOut, currentUser }) => (
  <div style={{ textAlign: 'center' }}>
    <div>Dashboard</div>
    <div>
      Welcome,
      {currentUser.attributes.name}
    </div>
    <div>
      <Link href="/">
        <a href="/">Home</a>
      </Link>
    </div>
    <div>
      <Link href="/hirePageEditor">
        <a href="/hirePageEditor">Hire Editor</a>
      </Link>
    </div>
    <div>
      <button type="button" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  </div>
);

export default WithAuthentication(Dashboard, { routeType: RouteType.SIGNED_IN });
