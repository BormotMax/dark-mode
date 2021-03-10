/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, memo } from 'react';
import classnames from 'classnames';

import InPlaceModalLayout from './modalLayout';
import styles from './inPlaceModal.module.scss';

export enum InPlaceModalVariants {
  WIDE,
  BLOCK,
  FIXED,
  FIXED_PLACED,
}

interface InPlaceModalProps {
  button: JSX.Element;
  variant?: InPlaceModalVariants;
}

export const InPlaceModal: React.FC<InPlaceModalProps> = memo(({
  children,
  button,
  variant,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({
    left: 0,
    top: 0,
  });

  const isFixedPlacedVariant = variant === InPlaceModalVariants.FIXED_PLACED;

  const openModal = (e) => {
    e.stopPropagation();
    if (e.key && e.key !== 'Enter') {
      return;
    }
    if (isFixedPlacedVariant) {
      const { left, top, height } = e.currentTarget.getBoundingClientRect();
      const offset = 2;
      const topGap = top + height + offset;
      setModalPosition({ left, top: topGap });
    }

    setIsModalOpen(true);
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
        <InPlaceModalLayout isFixedPosition={isFixedPlacedVariant}>
          <>
            <div tabIndex={-1} className={classnames(styles.modal)} onClick={closeAddPersonModal} />
            <div className={classnames(styles.modalContent)}>
              <div
                style={isFixedPlacedVariant ? modalPosition : null}
                className={classnames(styles.modalContentInner, {
                  [styles['modalContentInner--wide']]: variant === InPlaceModalVariants.WIDE,
                  [styles['modalContentInner--block']]: variant === InPlaceModalVariants.BLOCK,
                  [styles['modalContentInner--fixed']]: variant === InPlaceModalVariants.FIXED,
                  [styles['modalContentInner--fixedPlaced']]: isFixedPlacedVariant,
                })}
              >
                {/* @ts-ignore */}
                {React.cloneElement(children, { close: closeAddPersonModal })}
              </div>
            </div>
          </>
        </InPlaceModalLayout>
      ) : null}
    </>
  );
});

InPlaceModal.displayName = 'InPlaceModal';
