import Link from 'next/link';
import { WithAuthentication } from '../components/withAuthentication';
import { AuthProps } from '../types/custom';

const Dashboard: React.FC<AuthProps> = ({ user, signOut }) => (
  <div style={{ textAlign: 'center' }}>
    <div>
      Dashboard
    </div>
    <div>
      Welcome,
      {' '}
      {user.attributes.name}
    </div>
    <div>
      <Link href="/">
        <a href="/">
          Home
        </a>
      </Link>
    </div>
    <div>
      <button type="button" onClick={() => signOut()}>Sign Out</button>
    </div>
  </div>
);

export default WithAuthentication(Dashboard);
