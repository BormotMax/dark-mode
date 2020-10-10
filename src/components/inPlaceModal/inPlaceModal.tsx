/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classnames from 'classnames';
import styles from './inPlaceModal.module.scss';

interface InPlaceModalProps {
  isOpen: boolean;
  close: Function;
}

export const InPlaceModal: React.FC<InPlaceModalProps> = ({ isOpen, close, children }) => (isOpen ? (
  <>
    <div tabIndex={-1} className={classnames(styles.modal)} onClick={(e) => close(e)} />
    <div className={classnames(styles.modalContent)}>
      <div className={classnames(styles.modalContentInner)}>{children}</div>
    </div>
  </>
) : null);
