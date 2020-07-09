import { Comment } from '../comment';
import { Comment as CommentProps } from '../../types/custom';
import styles from './comments.module.scss';

interface CommentsProps {
  comments: Array<CommentProps>
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => (
  <div className={styles.comments}>
    <div className={styles.header}>
      <div>Comments</div>
      <div className={styles.line} />
    </div>
    <div>
      {comments.filter(Boolean).map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  </div>
);
