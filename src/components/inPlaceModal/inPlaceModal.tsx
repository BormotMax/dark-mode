import classnames from 'classnames';
import styles from './inPlaceModal.module.scss';
import { ButtonSmall } from '../buttons/buttons';

interface InPlaceModalProps {
  isOpen: boolean;
  close: Function;
}

export const InPlaceModal: React.FC<InPlaceModalProps> = ({ isOpen, close, children }) => {
  return isOpen ? (
    <>
      <div className={classnames(styles.modal)} onClick={close} />
      <div className={classnames(styles.modalContent)}>
        <div className={classnames(styles.modalContentInner)}>{children}</div>
      </div>
    </>
  ) : null;
};
