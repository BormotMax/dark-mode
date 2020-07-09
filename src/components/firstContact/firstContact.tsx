import classnames from 'classnames';
import styles from './firstContact.module.scss';

interface FirstContactProps {
  name: string
  message: string
  submittedAt: Date
}

export const FirstContact: React.FC<FirstContactProps> = ({ name, message, submittedAt }) => (
  <div className="mbm">
    <div className="header-2-lg">
      First Contact from
      {' '}
      {name}
    </div>
    <div>
      <div className="header-2-md">Message</div>
      <div className={classnames('text-2', 'mbm', styles.message)}>{message}</div>
    </div>
    <div className="text-2 text-blue">
      Submitted
      {' '}
      {submittedAt.toDateString()}
    </div>
  </div>
);
