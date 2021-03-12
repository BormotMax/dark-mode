/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/pro-light-svg-icons';

import styles from './assetDragAndDrop.module.scss';

interface AssetDragAndDropProps {
  onDrop: Function;
}

export const AssetDragAndDrop: React.FC<AssetDragAndDropProps> = ({ onDrop }) => {
  const [isDragOver, setDragOver] = React.useState(false);

  const handleFileDrop = (e) => {
    e.preventDefault();

    const files = [];

    if (e.dataTransfer.items) {
      for (const item of e.dataTransfer.items) {
        if (item.kind === 'file') {
          files.push(item.getAsFile());
        }
      }
    } else {
      for (const item of e.dataTransfer.files) {
        files.push(item);
      }
    }

    onDrop(files);
    setDragOver(false);
  };

  return (
    <div
      onDrop={handleFileDrop}
      onDragEnter={() => setDragOver(true)}
      onDragLeave={() => setDragOver(false)}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      className={classnames(styles.assetDragAndDrop, { [styles.dragOver]: isDragOver })}
    >
      <FontAwesomeIcon size="4x" icon={faCloudArrowUp} />
      <div className={classnames(styles.text)}>Drag & drop your files here</div>
    </div>
  );
};
