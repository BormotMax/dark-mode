import classnames from 'classnames';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  handleClose: Function;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, children }) => {
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

  if (isOpen) {
    document.querySelector('html').classList.add('is-clipped');
  } else {
    document.querySelector('html').classList.remove('is-clipped');
  }

  return (
    <div className={classnames('modal', { 'is-active': isOpen })}>
      <div aria-hidden="true" onClick={() => handleClose()} className="modal-background" />
      <div className="modal-content">{children}</div>
      <button onClick={() => handleClose()} type="button" className="modal-close is-large" aria-label="close" />
    </div>
  );
};
