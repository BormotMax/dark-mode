import { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  handleClose: Function;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, children }) => {
  const [isModalDown, setIsModalDown] = useState(false);

  function handleKeyDown(e) {
    if (e.keyCode === 27) {
      handleClose();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // This causes the isActive class to get applied after the top value is already -100%
  // so that the modal transitions to a top = 0.
  useEffect(() => {
    if (isOpen) {
      setIsModalDown(true);
    } else {
      setIsModalDown(false);
    }
  }, [isOpen]);

  if (isOpen) {
    document.querySelector('html').classList.add('is-clipped');
  } else {
    document.querySelector('html').classList.remove('is-clipped');
  }

  return (
    <div className={classnames('modal', { 'is-active': isOpen })}>
      <div aria-hidden="true" onClick={() => handleClose()} className="modal-background" />
      <div className={classnames('modal-content', styles.modalContent, { [styles.isActive]: isModalDown })}>{children}</div>
      <button onClick={() => handleClose()} type="button" className="modal-close is-large" aria-label="close" />
    </div>
  );
};
