import styles from './comment.module.scss';
import { Comment as CommentType } from '../../types/custom';
import { UserRole } from '../../API';

interface CommentProps {
  comment: CommentType
}

export const Comment: React.FC<CommentProps> = ({ comment }) => (
  <div
    className={`${styles.comment} ${
      comment.creator.role === UserRole.FREELANCER
        ? styles.commentDark
        : styles.commentLight
    }`}
  >
    <div className={styles.header}>
      <div className="text-2 text-normal text-blue">{comment.creator.name}</div>
      <div className="text-2 text-small text-gray">{new Date(comment.createdAt).toDateString()}</div>
    </div>
    <img
      alt="avatar"
      className={styles.avatar}
      // src={comment.creator.avatarUrl}
    />
    <div className="text-2 text-gray">{comment.content}</div>
  </div>
);
