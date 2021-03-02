import { faCirclePlus, faClipboard } from '@fortawesome/pro-light-svg-icons';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CreateNoteInput, UpdateNoteInput } from '../../API';
import { createNote, updateNote } from '../../graphql/mutations';
import { useLogger, useFlash } from '../../hooks';
import { client } from '../../pages/_app';
import { Note, ProjectFreelancer } from '../../types/custom';
import { InPlaceModal } from '../inPlaceModal';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import { Protected } from '../protected/protected';
import { ButtonSmall } from '../buttons/buttons';
import { truncate } from '../../helpers/util';
import { Features } from '../../permissions';

import styles from './notesTab.module.scss';

interface NotesTabProps {
  refetchData(): Promise<void>;
  projectUser: ProjectFreelancer;
}

export const NotesTab: React.FC<NotesTabProps> = ({ refetchData, projectUser }) => (
  <>
    <div className={classnames(modalStyles.addNew)}>
      <Protected feature={Features.NotesTab}>
        <InPlaceModal button={<FontAwesomeIcon color="#3C78FB" icon={faCirclePlus} />}>
          <ModalContent refetchData={refetchData} selectedNote={null} projectUser={projectUser} />
        </InPlaceModal>
      </Protected>
    </div>
    {projectUser.notes.items
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .map((note) => {
        const text = truncate((note.title || note.content.split('\n')[0] || 'Untitled note'), 35);
        return (
          <InPlaceModal
            key={note.id}
            button={
              <div role="button" tabIndex={0} className={classnames(modalStyles.modalPill)}>
                <div className={classnames(modalStyles.icon)}>
                  <FontAwesomeIcon color="#828282" icon={faClipboard} />
                </div>
                <div>{text}</div>
              </div>
          }
          >
            <ModalContent refetchData={refetchData} projectUser={projectUser} selectedNote={note} />
          </InPlaceModal>
        );
      })}
  </>
);

interface ModalContentProps {
  close?: Function;
  refetchData(): Promise<void>;
  selectedNote: Note;
  projectUser: ProjectFreelancer;
}

const ModalContent: React.FC<ModalContentProps> = ({ close, refetchData, selectedNote, projectUser }) => {
  const [content, setContent] = useState(selectedNote?.content || '');
  const [title] = useState(selectedNote?.title || '');
  const [isSaving, setIsSaving] = useState(false);
  const { logger } = useLogger();
  const { setFlash } = useFlash();

  const handleCreateNote = async () => {
    const createNoteInput: CreateNoteInput = { projectFreelancerID: projectUser.id, title, content };

    try {
      await client.mutate({
        mutation: gql(createNote),
        variables: { input: createNoteInput },
      });
    } catch (error) {
      logger.error('NotesTabModalContent: error creating Note', { error, input: createNoteInput });
      setFlash("Something went wrong. We're looking into it");
    }
  };

  const handleUpdateNote = async () => {
    const updateNoteInput: UpdateNoteInput = { id: selectedNote.id, title, content };

    try {
      await client.mutate({
        mutation: gql(updateNote),
        variables: { input: updateNoteInput },
      });
    } catch (error) {
      logger.error('NotesTabModalContent: error updating Note', { error, input: updateNoteInput });
      setFlash("Something went wrong. We're looking into it");
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);

    if (selectedNote) {
      await handleUpdateNote();
    } else {
      await handleCreateNote();
    }

    await refetchData();
    close();
  };

  return (
    <div>
      <div className={classnames(styles.title)}>{title || content.split('\n')[0] || 'Untitled note'}</div>
      <textarea className={classnames('textarea', styles.textarea)} onChange={({ target }) => setContent(target.value)} value={content} />
      <div className={classnames(modalStyles.actionBar)}>
        <button onClick={() => close()} className={classnames(modalStyles.cancel)} type="button">
          Cancel
        </button>
        <ButtonSmall text="Save" onClick={handleSubmit} isSaving={isSaving} />
      </div>
    </div>
  );
};
