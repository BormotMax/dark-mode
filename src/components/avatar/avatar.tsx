import styles from './avatar.module.scss';
import { gravatarUrl } from '../../helpers/gravatarUrl';

interface AvatarProps {
  url?: string;
  email?: string;
}

// Use the url if given, else use the email to get the gravatar, else use the blank image
export const Avatar: React.FC<AvatarProps> = ({ url, email }) => (
  <img alt="avatar" className={styles.avatar} src={url || (email ? gravatarUrl(email) : '/blankAvatar.jpg')} />
);
