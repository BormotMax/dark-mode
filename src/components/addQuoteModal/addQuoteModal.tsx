import classnames from 'classnames';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/pro-regular-svg-icons';
import styles from './addQuoteModal.module.scss';
import { InPlaceModal } from '../inPlaceModal';
import { ButtonSmall } from '../buttons/buttons';

interface AddQuoteModalProps {
  projectID: string;
}

export const AddQuoteModal: React.FC<AddQuoteModalProps> = ({ projectID }) => {
  return (
    <div className={classnames(styles.addQuoteModal)}>
      <InPlaceModal button={<FontAwesomeIcon color="#595959" icon={faUserPlus} />}>
        <ModalContent projectID={projectID} />
      </InPlaceModal>
    </div>
  );
};

interface ModalContentProps {
  close?: Function;
  projectID: string;
}

const ModalContent: React.FC<ModalContentProps> = ({ close, projectID }) => {
  const [tasks, setTasks] = useState([]);
  const [hours, setHours] = useState(null);
  const [perHour, setPerHour] = useState(null);
  const [price, setPrice] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    close(e);
  };

  return (
    <div className={classnames(styles.modalContent)}>
      <div className={classnames(styles.header)}>Generate Quote</div>
      <div className={classnames(styles.tasks)}>
        {tasks.map((task, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx} className={classnames(styles.task)}>
            <div>Research</div>
            <FontAwesomeIcon color="#595959" icon={faUserPlus} />
          </div>
        ))}
        <div className={classnames(styles.add)}>Add new line item</div>
        <div>
          This work will take {hours} billable hours at ${perHour} per hour.
        </div>
        <div>This is a project price of ${price}</div>
        <div className={styles.save}>
          <ButtonSmall text="Save" isSaving={isSaving} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
