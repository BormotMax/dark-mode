import classnames from 'classnames';
import { User } from '../../types/custom';
import { Avatar } from '../avatar/avatar';
import styles from './contactPreview.module.scss';

interface ContactPreviewProps {
  users: User[];
}

export const ContactPreview: React.FC<ContactPreviewProps> = ({ users }) => {
  return (
    <>
      {users.map((u) => (
        <div key={u.id} className={classnames(styles.contactPreview)}>
          <Avatar email={u.email} />
          <div>
            {u.name}, <span className={classnames(styles.title)}>Creative Director</span>
          </div>
        </div>
      ))}
    </>
  );
};
