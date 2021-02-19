import React, { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';

import styles from './avatarUpload.module.scss';

enum UploadState {
  BEGIN,
  LOADING,
  DONE,
}

type AvatarUpload = {
  email?: string,
  className?: string,
  image?: string,
  avatarName?: string,
  avatarWidth?: number,
  avatarHeight?: number,
  onChange: (file: any) => void,
  isLoading?: boolean,
};

export const AvatarUpload: React.FC<AvatarUpload> = ({
  image,
  avatarName,
  avatarWidth = 96,
  avatarHeight = 96,
  onChange,
  className,
  isLoading = false,
}) => {
  const [fileSrc, setFileSrc] = useState('');
  const [uploadState, setUploadState] = useState(isLoading ? UploadState.LOADING : UploadState.BEGIN);

  useEffect(() => {
    setFileSrc(image);
    if (image) {
      setUploadState(UploadState.DONE);
    }
  }, [image]);

  useEffect(() => {
    setUploadState(isLoading ? UploadState.LOADING : UploadState.DONE);
  }, [isLoading]);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target?.files[0];

    if (file) {
      setFileSrc(URL.createObjectURL(file));
      setUploadState(UploadState.DONE);
      onChange(file);
    }
  }, [setFileSrc, setUploadState, onChange]);

  return (
    <div className={classnames(
      styles.avatarIconContainer,
      className,
      { [styles.loading]: uploadState === UploadState.LOADING },
    )}
    >
      <label className={styles.browseButton} htmlFor={`${avatarName}-fileInput`}>
        <input
          type="file"
          name={avatarName}
          className={styles.fileInput}
          id={`${avatarName}-fileInput`}
          accept="image/png, image/jpeg, image/gif, image/jpg"
          onChange={handleFileInputChange}
        />
        {fileSrc && (
          <img
            alt="avatar"
            src={fileSrc}
            data-cy={`img-${avatarName}`}
            className={styles.avatar}
            style={{ width: avatarWidth, height: avatarHeight }}
          />
        )}
        {!fileSrc && (
          <div className={styles.avatarIcon}>
            <FontAwesomeIcon
              className={styles.avatarIconSize}
              size="2x"
              icon={faPlus}
              color="#3C78FB"
            />
          </div>
        )}
      </label>
    </div>
  );
};
