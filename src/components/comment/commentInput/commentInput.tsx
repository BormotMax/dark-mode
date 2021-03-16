import React, { useState, memo, useCallback, useRef } from 'react';
import gql from 'graphql-tag';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileWink } from '@fortawesome/pro-regular-svg-icons';
import { usePopper } from 'react-popper';
import TextareaAutosize from 'react-textarea-autosize';
import { Picker, BaseEmoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import { useLogger } from '../../../hooks';
import { unauthClient } from '../../../pages/_app';
import { createComment } from '../../../graphql/mutations';
import { isClickOrEnter } from '../../../helpers/util';
import { MouseOrKeyboardEvent } from '../../../types/custom';
import Modal from '../../modal';

import styles from '../comment.module.scss';
import CommentLayout from '../commentLayout';

const TEXT_AREA_HEIGHT = 36;
const DEFAULT_MODAL_OFFSET_Y = TEXT_AREA_HEIGHT / 2;

type NewCommentProps = {
  projectID: string,
  creatorID: string,
  email?: string,
  s3key?: string,
};

export const CommentInput = memo<NewCommentProps>(({
  projectID,
  creatorID,
  email = '',
  s3key = '',
}) => {
  const { logger } = useLogger();

  const [content, setContent] = useState('');
  const [inputCaretPosition, setInputCaretPosition] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const referenceElementRef = useRef<HTMLButtonElement>();
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement>(null);
  const [modalOffsetY, setModalOffsetY] = useState(DEFAULT_MODAL_OFFSET_Y);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElementRef.current,
    popperElement,
    {
      placement: 'top-start',
      modifiers: [
        {
          name: 'offset',
          options: { offset: [-15, modalOffsetY] },
        },
        { name: 'arrow' },
      ],
    },
  );

  const handleCreateComment = async (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event) || isSaving || content.trim() === '' || !projectID || !creatorID) return;

    setIsSaving(true);
    const input = {
      projectID,
      creatorID,
      content,
    };
    try {
      await unauthClient.mutate({
        mutation: gql(createComment),
        variables: { input },
      });

      setContent('');
    } catch (error) {
      logger.error('NewComment: error creating comment', { error, input });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEnterTextArea = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleCreateComment(event);
    }
  };

  const handleChangeTextArea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    },
    [],
  );

  const onTextAreaHeightChange = useCallback(
    (height: number) => {
      setModalOffsetY(height / 2);
    },
    [],
  );

  const onBlurTextArea = useCallback(
    (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setInputCaretPosition(event.target.selectionStart);
    },
    [],
  );

  const openModal = (event: MouseOrKeyboardEvent) => {
    if (!isClickOrEnter(event)) return;
    setModalIsOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const onSelectEmoji = useCallback(
    (emoji: BaseEmoji) => {
      setModalIsOpen(false);
      setContent((prevState) => (
        `${prevState.slice(0, inputCaretPosition)}${emoji.native}${prevState.slice(inputCaretPosition)}`
      ));
      // next frame
      setTimeout(() => {
        const range = inputCaretPosition + emoji.native.length;
        textAreaRef?.current?.focus();
        textAreaRef?.current?.setSelectionRange(range, range);
      }, 0);
    },
    [inputCaretPosition],
  );

  return (
    <CommentLayout
      isLast
      fluid
      noPaddings
      hasDetails={false}
      s3key={s3key ?? ''}
      email={email}
    >
      <div className={styles.inputWrapper}>
        <div className={styles.emojiButton}>
          <button
            ref={referenceElementRef}
            className="defaultButton"
            type="button"
            tabIndex={0}
            onClick={openModal}
            onKeyPress={openModal}
          >
            <FontAwesomeIcon size="1x" color="#A4A2AE" icon={faFaceSmileWink} />
          </button>
        </div>
        <TextareaAutosize
          ref={textAreaRef}
          onBlur={onBlurTextArea}
          onChange={handleChangeTextArea}
          onKeyPress={handleEnterTextArea}
          value={content}
          className={styles.input}
          name="content"
          id="content"
          minRows={1}
          placeholder="Add a comment"
          onHeightChange={onTextAreaHeightChange}
        />
        <button
          className={classnames('defaultButton', styles.sendButton)}
          type="button"
          tabIndex={0}
          onKeyDown={handleCreateComment}
          onClick={handleCreateComment}
        >
          Send
        </button>
      </div>
      <Modal
        noOverlay
        closeModal={closeModal}
        isOpen={modalIsOpen}
        ref={setPopperElement}
        popperStyles={popperStyles.popper}
        popperAttributes={attributes.popper}
        className={styles.emojis}
      >
        <>
          <Picker emoji="point_up" title="Pick your emoji..." onSelect={onSelectEmoji} />
          <div data-popper-arrow="true" className={styles.arrow} />
        </>
      </Modal>
    </CommentLayout>
  );
});

CommentInput.displayName = 'CommentInput';
