import classnames from 'classnames';
import styles from './comment.module.scss';
import { Comment as CommentType } from '../../types/custom';
import { UserRole } from '../../API';

interface CommentWrapperProps {
  comment: CommentType;
  avatarUrl?: string;
}

interface CommentProps {
  name?: string;
  createdAt?: string;
  avatarUrl?: string;
  isMine?: boolean;
}

export const CommentWrapper: React.FC<CommentWrapperProps> = ({ comment, avatarUrl }) => (
  <Comment
    name={comment.creator.name}
    createdAt={comment.createdAt}
    avatarUrl={avatarUrl}
    isMine={comment.creator.role === UserRole.FREELANCER}
  >
    <div>{comment.content}</div>
  </Comment>
);

// eslint-disable-next-line object-curly-newline
export const Comment: React.FC<CommentProps> = ({ name, createdAt, avatarUrl, children, isMine = true }) => (
  <div
    className={classnames(styles.comment, {
      [styles.commentDark]: !isMine,
      [styles.commentLight]: isMine,
    })}
  >
    <div className={styles.header}>
      <div className="text-2 text-normal text-blue">{name}</div>
      {createdAt && <div className="text-2 text-small text-gray">{new Date(createdAt).toDateString()}</div>}
    </div>
    <img alt="avatar" className={styles.avatar} src={avatarUrl || '/blankAvatar.jpg'} />
    <div className="text-2 text-gray">{children}</div>
  </div>
);
