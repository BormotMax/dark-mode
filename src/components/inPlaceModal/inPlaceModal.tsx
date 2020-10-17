/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classnames from 'classnames';
import React, { useState } from 'react';
import styles from './inPlaceModal.module.scss';

interface InPlaceModalProps {
  button: JSX.Element;
}

export const InPlaceModal: React.FC<InPlaceModalProps> = ({ children, button }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      e.stopPropagation();
      setIsModalOpen(true);
    }
  };

  const closeAddPersonModal = (e) => {
    e?.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <span role="button" tabIndex={0} onKeyDown={openModal} onClick={openModal}>
        {button}
      </span>
      {isModalOpen ? (
        <>
          <div tabIndex={-1} className={classnames(styles.modal)} onClick={closeAddPersonModal} />
          <div className={classnames(styles.modalContent)}>
            {/* @ts-ignore */}
            <div className={classnames(styles.modalContentInner)}>{React.cloneElement(children, { close: closeAddPersonModal })}</div>
          </div>
        </>
      ) : null}
    </>
  );
};
