import { Comment } from '../comment';
import styles from './comments.module.scss';

interface CommentsProps {
  comments: Array<Comment>
}

interface Comment {
  text: string
  name: string
  createdAt: Date
  avatar?: string
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => (
  <div className={styles.comments}>
    <div className={styles.header}>
      <div>Comments</div>
      <div className={styles.line} />
    </div>
    <div>
      {comments.map((c, i) => (
        <Comment key={i} avatar={i % 2 === 1 ? '/avatar.jpg' : '/avatar_2.png'} text={c.text} name={c.name} createdAt={c.createdAt} even={i % 2 === 0} />
      ))}
    </div>
  </div>

);
