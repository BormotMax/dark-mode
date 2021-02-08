import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';

import Portal from '../portal';
import { isClickOrEnter } from '../../helpers/util';

import styles from './modal.module.scss';

const DEFAULT_MODAL_MAX_WIDTH = '668px';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  maxWidth?: string;
  topPlacedModal?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  topPlacedModal = false,
  isOpen,
  closeModal,
  maxWidth = DEFAULT_MODAL_MAX_WIDTH,
  children,
}) => {
  const [isModalDown, setIsModalDown] = useState(false);

  // For animation
  useEffect(
    () => {
      if (isOpen) {
        setIsModalDown(true);
        document.documentElement.classList.add(styles.disableScroll);
      } else {
        setIsModalDown(false);
        document.documentElement.classList.remove(styles.disableScroll);
      }
    },
    [isOpen],
  );

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onOverlayClick = (event: React.MouseEvent<EventTarget> | React.KeyboardEvent<EventTarget>) => {
    if (!isClickOrEnter(event)) return;
    closeModal();
  };

  const onModalClick = (event: React.MouseEvent<EventTarget> | React.KeyboardEvent<EventTarget>) => {
    if (!isClickOrEnter(event)) return;
    event.stopPropagation();
  };

  const modalStyle = useMemo(
    () => ({ maxWidth }),
    [maxWidth],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        role="button"
        tabIndex={0}
        onKeyPress={onOverlayClick}
        onClick={onOverlayClick}
        className={styles.overlay}
      >
        <div
          role="button"
          tabIndex={0}
          onKeyPress={onModalClick}
          onClick={onModalClick}
          style={modalStyle}
          className={classnames(
            styles.modal,
            {
              [styles.animatedModal]: topPlacedModal,
              [styles.animatedOpen]: isModalDown,
            },
          )}
        >
          {children}
        </div>
        {topPlacedModal && (
          <button
            onClick={closeModal}
            type="button"
            className={classnames(styles.closeButton, 'modal-close', 'is-large')}
            aria-label="close"
          />
        )}
      </div>
    </Portal>
  );
};
