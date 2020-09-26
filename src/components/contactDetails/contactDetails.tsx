import classnames from 'classnames';
import { faClipboardUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './contactDetails.module.scss';
import { User } from '../../types/custom';
import { Avatar } from '../avatar/avatar';

interface ContactDetailsProps {
  user: User;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({ user }) => (
  <div className={classnames(styles.contactDetails)}>
    <div className={classnames(styles.header)}>
      <FontAwesomeIcon size="1x" color="#595959" icon={faClipboardUser} />
      <span>{user.name}</span>
    </div>
    <div className={classnames(styles.content)}>
      <Avatar email={user.email} />
      <div className={classnames(styles.right)}>
        <div>{user.name}</div>
        <div>{user.company}</div>
        <div>{user.email}</div>
        <div>{user.phone}</div>
      </div>
    </div>
  </div>
);
