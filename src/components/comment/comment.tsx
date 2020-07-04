import styles from './comment.module.scss';

interface CommentProps {
  text: string
  name: string
  createdAt: Date
  even?: boolean
  avatar?: string
}

export const Comment: React.FC<CommentProps> = ({
  text, name, createdAt, avatar, even = false,
}) => (
  <div
    className={`${styles.comment} ${
      even
        ? styles.commentDark
        : styles.commentLight
    }`}
  >
    <div className={styles.header}>
      <div className="text-2 text-normal text-blue">{name}</div>
      <div className="text-2 text-small text-gray">{createdAt.toDateString()}</div>
    </div>
    <img
      alt="avatar"
      className={styles.avatar}
      src={avatar}
    />
    <div className="text-2 text-gray">{text}</div>
  </div>
);
