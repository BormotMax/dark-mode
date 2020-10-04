import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { useState } from 'react';
import { User } from '../../types/custom';
import { Avatar } from '../avatar/avatar';
import styles from './contactPreview.module.scss';
import { InPlaceModal } from '../inPlaceModal/inPlaceModal';
import { ButtonSmall } from '../buttons/buttons';
import Unchecked from '../../img/unchecked.svg';
import Checked from '../../img/checkmark.svg';

interface ContactPreviewProps {
  users: User[];
}

export const ContactPreview: React.FC<ContactPreviewProps> = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddPersonModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeAddPersonModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={classnames(styles.addPerson)}>
        <span onClick={openAddPersonModal}>
          <FontAwesomeIcon color="#595959" icon={faUserPlus} />
          <InPlaceModal isOpen={isModalOpen} close={closeAddPersonModal}>
            <ModalContent />
          </InPlaceModal>
        </span>
      </div>
      {users.map((u) => (
        <div key={u.id} className={classnames(styles.contactPreview)}>
          <Avatar email={u.email} />
          <div>
            {u.name}, <span className={classnames(styles.title)}>Creative Director</span>
          </div>
        </div>
      ))}
    </>
  );
};

const ModalContent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const invalids = { email: undefined, name: undefined, title: undefined };
  const isSaving = false;
  return (
    <form className={classnames(styles.addPersonModal)} onSubmit={(e) => handleSubmit(e)}>
      <div className="field">
        <label htmlFor="name" className="label">
          Name
        </label>
        <div className="control">
          <input name="name" className={classnames('input', { 'is-danger': invalids.name })} type="text" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="title" className="label">
          Title
        </label>
        <div className="control">
          <input name="title" className={classnames('input', { 'is-danger': invalids.title })} type="text" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email" className="label">
          Email
        </label>
        <div className="control">
          <input required name="email" className={classnames('input', { 'is-danger': invalids.email })} type="email" maxLength={48} />
        </div>
      </div>
      <div className={classnames(styles.radioGroup, 'control')}>
        <label className={classnames(styles.radio, 'radio')}>
          <input type="radio" name="userType" />
          <span className={classnames(styles.checkmarks)}>
            <span className={classnames(styles.unchecked)}>
              <Unchecked />
            </span>
            <span className={classnames(styles.checked)}>
              <Checked />
            </span>
          </span>
          Client&apos;s Team
        </label>
        <label className={classnames(styles.radio, 'radio')}>
          <input type="radio" name="userType" />
          <span className={classnames(styles.checkmarks)}>
            <span className={classnames(styles.unchecked)}>
              <Unchecked />
            </span>
            <span className={classnames(styles.checked)}>
              <Checked />
            </span>
          </span>
          My Team
        </label>
      </div>
      <div className={styles.save}>
        <ButtonSmall text="Save" isSaving={isSaving} onClick={handleSubmit} />
      </div>
    </form>
  );
};
