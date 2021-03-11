import React from 'react';
import classnames from 'classnames';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import Button from '../button';

interface DeletePersonModalProps {
  deletePerson: () => Promise<void>;
  closeModal: () => void;
  userName: string;
}

export const DeletePersonModal: React.FC<DeletePersonModalProps> = ({
  closeModal,
  deletePerson,
  userName,
}) => {
  return (
    <div className={classnames(modalStyles.addNew)}>
      <div className={classnames(modalStyles.deleteMember)} >
          {`Are you sure you want to delete ${userName}?`}
        <div className={modalStyles.delete}>
              <Button
                height="40px"
                onClick={closeModal}
                style={{ fontSize: '18px' }}
              >
                Cancel
              </Button>
              <Button
                height="40px"
                onClick={deletePerson}
                style={{ fontSize: '18px' }}
                inverted
              >
                Yes, Delete
              </Button>
        </div>
      </div>
    </div>
  )
};
