/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classnames from 'classnames';
import React, { useState } from 'react';
import styles from './inPlaceModal.module.scss';

export enum InPlaceModalVariants {
  WIDE,
  BLOCK,
  FIXED
}

interface InPlaceModalProps {
  button: JSX.Element;
  variant?: InPlaceModalVariants;
}

export const InPlaceModal: React.FC<InPlaceModalProps> = ({ children, button, variant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      e.stopPropagation(); setIsModalOpen(true);
    }
  };

  const closeAddPersonModal = (e) => {
    e?.stopPropagation();
    setIsModalOpen(false);
  };

  // if (isModalOpen) {
  //   document.querySelector('html').classList.add('is-clipped');
  // } else {
  //   document.querySelector('html').classList.remove('is-clipped');
  // }

  return (
    <>
      <span role="button" tabIndex={0} onKeyDown={openModal} onClick={openModal}>
        {button}
      </span>
      {isModalOpen ? (
        <>
          <div tabIndex={-1} className={classnames(styles.modal)} onClick={closeAddPersonModal} />
          <div className={classnames(styles.modalContent)}>
            <div
              className={classnames(styles.modalContentInner, {
                [styles['modalContentInner--wide']]: variant === InPlaceModalVariants.WIDE,
                [styles['modalContentInner--block']]: variant === InPlaceModalVariants.BLOCK,
                [styles['modalContentInner--fixed']]: variant === InPlaceModalVariants.FIXED,
              })}
            >
              {/* @ts-ignore */}
              {React.cloneElement(children, { close: closeAddPersonModal })}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
