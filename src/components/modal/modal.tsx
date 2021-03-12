import React, { useEffect, useMemo, useState, forwardRef } from 'react';
import classnames from 'classnames';

import { isClickOrEnter } from '../../helpers/util';
import { MouseOrKeyboardEvent } from '../../types/custom';
import Portal from '../portal';

import styles from './modal.module.scss';

export type ModalProps = {
  isOpen: boolean,
  closeModal: () => void,
  maxWidth?: string,
  topPlacedModal?: boolean,
  children: React.ReactNode,
  closeOnBackdropClick?: boolean,
  popperStyles?: React.CSSProperties;
  popperAttributes?: { [key: string]: string; };
  setPopperElement?: () => void,
  noOverlay?: boolean,
  className?: string,
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  topPlacedModal,
  isOpen,
  closeModal,
  maxWidth,
  closeOnBackdropClick,
  popperStyles,
  popperAttributes,
  noOverlay,
  className,
  children,
}, ref): JSX.Element | null => {
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

  const onOverlayClick = (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event) || !closeOnBackdropClick) return;
    closeModal();
  };

  const onModalClick = (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event)) return;
    event.stopPropagation();
  };

  const modalStyle = useMemo(
    () => {
      const style = { ...popperStyles };
      if (maxWidth) {
        style.maxWidth = maxWidth;
        style.width = '100%';
      }
      return style;
    },
    [maxWidth, popperStyles],
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
        className={classnames(
          styles.overlay,
          { [styles.overlayBackground]: !noOverlay },
        )}
      >
        <div
          ref={ref}
          role="button"
          tabIndex={0}
          onKeyPress={onModalClick}
          onClick={onModalClick}
          style={modalStyle}
          className={classnames(
            styles.modal,
            className,
            {
              [styles.animatedModal]: topPlacedModal,
              [styles.animatedOpen]: isModalDown,
            },
          )}
          {...popperAttributes}
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
});

Modal.displayName = 'Modal';

Modal.defaultProps = {
  maxWidth: null,
  topPlacedModal: false,
  closeOnBackdropClick: true,
  popperStyles: {},
  popperAttributes: {},
  setPopperElement: null,
  noOverlay: false,
  className: null,
};

export default React.memo(Modal);
