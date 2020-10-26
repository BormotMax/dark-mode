/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React, { useState, KeyboardEvent } from 'react';
import { faPlusCircle, faFileAlt } from '@fortawesome/pro-light-svg-icons';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';
import { Storage } from 'aws-amplify';
import gql from 'graphql-tag';
import { AiIcon, DropboxIcon, FramerIcon, MiroIcon, ExcelIcon, FigmaIcon } from '../../img/icons';
import styles from './filesTab.module.scss';
import { InPlaceModal } from '../inPlaceModal';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import { ButtonSmall } from '../buttons/buttons';
import { AssetDragAndDrop } from '../assetDragAndDrop/assetDragAndDrop';
import { useFlash, useLogger } from '../../hooks';
import { unauthClient as client } from '../../pages/_app';
import { CreateProjectAssetsInput } from '../../API';
import { createProjectAssets } from '../../graphql/mutations';
import { ProjectAsset } from '../../types/custom';
import { Protected } from '../protected/protected';
import { Role } from '../withAuthentication';

const applicationToIcon: any = {
  figma: <FigmaIcon />,
  framer: <FramerIcon />,
  excel: <ExcelIcon />,
  miro: <MiroIcon />,
  ai: <AiIcon />,
  dropbox: <DropboxIcon />,
};

interface File {
  id: number;
  application: string;
  title: string;
}

interface FilesTabProps {
  files: ProjectAsset[];
  projectID: string;
  refetchData: Function;
}

function downloadURI(uri, name) {
  const link = document.createElement('a');
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const FilesTab: React.FC<FilesTabProps> = ({ files, projectID, refetchData }) => {
  const { setFlash } = useFlash();
  const { logger } = useLogger();

  const downloadFile = async (e, file) => {
    try {
      const asset = await Storage.get(file.asset.key);
      downloadURI(asset, file.fileName);
    } catch (error) {
      setFlash("Something went wrong. We're looking into it");
      logger.error('FilesTab: error fetching image from S3', { error, input: JSON.stringify(file) });
    }
  };

  return (
    <>
      <Protected roles={[Role.FREELANCER]}>
        <div className={classnames(modalStyles.addNew)}>
          <InPlaceModal button={<FontAwesomeIcon color="#3C78FB" icon={faPlusCircle} />}>
            <ModalContent projectID={projectID} refetchData={refetchData} />
          </InPlaceModal>
        </div>
      </Protected>
      {files
        // .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((file) => (
          <FilePill key={file.id} file={file} onClick={downloadFile} />
        ))}
    </>
  );
};

interface ModalContentProps {
  close?: Function;
  projectID: string;
  refetchData: Function;
}

const ModalContent: React.FC<ModalContentProps> = ({ close, projectID, refetchData }) => {
  const [fileUrl, setFileUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const { logger } = useLogger();
  const { setFlash } = useFlash();

  function handleAddFile(e: KeyboardEvent) {
    if (e.keyCode === 13 && fileUrl) {
      fetch(fileUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'downloaded_image', { type: blob.type });
          setFiles((oldFiles) => [...oldFiles, file]);
        });
      setFileUrl('');
    }
  }

  function handleFileDrop(droppedFiles) {
    setFiles((oldFiles) => [...oldFiles, ...droppedFiles]);
  }

  function handleFileInputChange(e) {
    const filesToAdd = e.target.files;
    setFiles((oldFiles) => [...oldFiles, ...Array.from(filesToAdd)]);
  }

  const uploadFiles = async () => {
    setIsSaving(true);
    const uploadPromises = [];

    for (const file of files) {
      const s3Key = `${uuid()}-${file.name}`;
      const createProjectAssetsInput: CreateProjectAssetsInput = {
        projectID,
        asset: { key: s3Key },
        fileName: file.name,
      };

      try {
        uploadPromises.push(
          Storage.put(s3Key, file, {
            contentDisposition: `attachment;filename=${file.name}`,
          }),
        );

        await client.mutate({
          mutation: gql(createProjectAssets),
          variables: { input: createProjectAssetsInput },
        });
      } catch (error) {
        setFlash("Something went wrong. We're looking into it");
        logger.error('FilesTabModalContent: error creating ProjectAsset', { error, input: createProjectAssetsInput });
      }
    }

    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      setFlash("Something went wrong. We're looking into it");
      logger.error('FilesTabModalContent: error creating ProjectAsset', { error, input: { projectID } });
    }

    await refetchData();
    close();
  };

  return (
    <div className={classnames(styles.modalContent)}>
      <div className={classnames(styles.centeredLabel)}>New Assets</div>
      <AssetDragAndDrop onDrop={handleFileDrop} />
      <div className={classnames(styles.centeredLabel)}>Or, add URL:</div>
      <input
        className={classnames(styles.urlInput)}
        type="text"
        autoComplete="off"
        onKeyDown={handleAddFile}
        onChange={({ target }) => setFileUrl(target.value)}
        value={fileUrl}
        name="fileUrl"
      />
      <div className={classnames(styles.orBrowse)}>
        <div className={classnames(styles.or)}>Or</div>
        <label className={styles.browseButton} htmlFor="fileInput">
          <input type="file" className={styles.fileInput} id="fileInput" multiple onChange={handleFileInputChange} />
          <div className="btn-small btn-invert">Browse</div>
        </label>
      </div>
      <div className={classnames(styles.filePillContainer)}>
        {files.map((file, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <FilePill key={i} file={file} />
        ))}
      </div>
      {/* {isSaving && (
        <>
          <progress className="progress is-primary" max="100" value={40} />
          <div className={classnames(styles.centeredLabel, styles.uploading)}>Uploading &apos;logo.svg&apos;...</div>
        </>
      )} */}
      <div className={classnames(styles.actionBar)}>
        <button className={classnames(styles.cancel)} type="button">
          Cancel
        </button>
        <ButtonSmall text="Save" onClick={uploadFiles} isSaving={isSaving} />
      </div>
    </div>
  );
};

interface FilePillProps {
  file: ProjectAsset | any;
  onClick?: Function;
}

const FilePill: React.FC<FilePillProps> = ({ file, onClick }) => {
  const handleSelect = (e, f) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      if (onClick) onClick(e, f);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleSelect(e, file)}
      onClick={(e) => handleSelect(e, file)}
      className={classnames(modalStyles.modalPill)}
    >
      <div className={classnames(modalStyles.icon)}>
        <FontAwesomeIcon color="#828282" icon={faFileAlt} />
      </div>
      <div>{file.fileName || file.name}</div>
    </div>
  );
};
