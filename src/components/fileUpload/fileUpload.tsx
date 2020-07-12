import classnames from 'classnames';
import { useState } from 'react';
import styles from './fileUpload.module.scss';
import UploadImage from '../../img/upload.svg';
import { FileInput } from '../fileInput';

interface FileUploadProps {
  helpText: string
  name: string
}

enum UploadState {
  BEGIN,
  LOADING,
  DONE
}

export const FileUpload:React.FC<FileUploadProps> = ({ helpText, name }) => {
  const [fileSrc, setFileSrc] = useState('');
  const [isDragOver, setDragOver] = useState(false);
  const [uploadState, setUploadState] = useState(UploadState.BEGIN);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setUploadState(UploadState.LOADING);

    let file;

    if (e.dataTransfer.items) {
      for (let i = 0; i < Math.min(1, e.dataTransfer.items.length); i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          file = e.dataTransfer.items[i].getAsFile();
        }
      }
    } else {
      for (let i = 0; i < Math.min(1, e.dataTransfer.files.length); i++) {
        file = e.dataTransfer.files[i];
      }
    }

    setFileSrc(URL.createObjectURL(file));
    setDragOver(false);
    setUploadState(UploadState.DONE);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileSrc(URL.createObjectURL(file));
      setUploadState(UploadState.DONE);
    }
  };

  return (
    <div className={classnames(styles.fileUpload, 'text-1', 'text-drkgray')}>
      {helpText}
      <div
        onDrop={handleFileDrop}
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        className={classnames(styles.dropArea,
          {
            [styles.loading]: uploadState === UploadState.LOADING,
            [styles.dragOver]: isDragOver,
            [styles.done]: uploadState === UploadState.DONE,
          })}
      >

        {fileSrc && <img src={fileSrc} alt="hirepageimage" /> }
        {!fileSrc && <UploadImage />}
      </div>
      <div className={styles.beneathDropArea}>
        Or
        {'  '}
        <FileInput name={name} onChange={handleFileInputChange} />
      </div>
    </div>
  );
};
