import React from 'react';
import classnames from 'classnames';
import { faSackDollar, faTimes } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './settings.module.scss';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import { ButtonSmall } from '../buttons/buttons';
import { isClickOrEnter } from '../../helpers/util';

interface SettingsProps {
  close?: Function
}

export const Settings: React.FC<SettingsProps> = ({ close }) => {
  const connectToStripe = () => {
    console.log('connecting to stripe');
  };

  const closeModal = (e: any) => {
    if (isClickOrEnter(e)) {
      close();
    }
  };

  return (
    <div className={classnames(styles.settings, modalStyles.modalWithHeaderContent)}>
      <div className={classnames(modalStyles.header, styles.header)}>Settings
        <div onClick={closeModal} role="button" onKeyDown={closeModal} tabIndex={0}>
          <FontAwesomeIcon color="#595959" icon={faTimes} />
        </div>
      </div>
      <div className={classnames(modalStyles.body, styles.body, 'columns')}>
        <div className={classnames(styles.left, 'column', 'is-narrow')}>
          <button type="button">
            <FontAwesomeIcon icon={faSackDollar} />
            Payments
          </button>
        </div>
        <div className={classnames(styles.right, 'column')}>
          <div>Connect your payment gateway</div>
          <ButtonSmall text="Connect with Stripe" onClick={connectToStripe} />
        </div>
      </div>
    </div>
  );
};
