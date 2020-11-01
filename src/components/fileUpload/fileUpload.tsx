import classnames from 'classnames';
import { useState, useEffect } from 'react';
import styles from './fileUpload.module.scss';
import UploadImage from '../../img/upload.svg';
import { FileInput } from '../fileInput';

interface FileUploadProps {
  helpText: string;
  name: string;
  image: string;
  onChange: Function;
  aspect?: string;
}

enum UploadState {
  BEGIN,
  LOADING,
  DONE,
}

export const FileUpload: React.FC<FileUploadProps> = ({ helpText, name, image, onChange, aspect = 'square' }) => {
  const [fileSrc, setFileSrc] = useState('');
  const [isDragOver, setDragOver] = useState(false);
  const [uploadState, setUploadState] = useState(UploadState.BEGIN);

  useEffect(() => {
    if (image) {
      setFileSrc(image);
      setUploadState(UploadState.DONE);
    }
  }, [image]);

  const handleFileDrop = (e) => {
    e.preventDefault();

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

    if (file) {
      setFileSrc(URL.createObjectURL(file));
      setUploadState(UploadState.DONE);
      onChange(file);
    }

    setDragOver(false);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileSrc(URL.createObjectURL(file));
      setUploadState(UploadState.DONE);
      onChange(file);
    }
  };

  return (
    <div className={classnames(styles.fileUpload, 'text-1', 'text-drkgray')}>
      {helpText}
      <div
        data-cy={`drop-area-${name}`}
        onDrop={handleFileDrop}
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        className={classnames(styles.dropArea, styles[`dropArea--${aspect}`], {
          [styles.loading]: uploadState === UploadState.LOADING,
          [styles.dragOver]: isDragOver,
          [styles.done]: uploadState === UploadState.DONE,
        })}
      >
        {fileSrc && <img src={fileSrc} alt="hirepageimage" data-cy={`img-${name}`} />}
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
