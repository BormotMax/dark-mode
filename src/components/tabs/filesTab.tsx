/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import React, { useState, KeyboardEvent, useRef } from 'react';
import { faCirclePlus, faFileLines, faLink } from '@fortawesome/pro-light-svg-icons';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';
import Storage from '@aws-amplify/storage';
import gql from 'graphql-tag';
import { AiIcon, DropboxIcon, FramerIcon, MiroIcon, ExcelIcon, FigmaIcon } from '../../img/icons';
import styles from './filesTab.module.scss';
import { InPlaceModal } from '../inPlaceModal';
import modalStyles from '../inPlaceModal/inPlaceModal.module.scss';
import { AssetDragAndDrop } from '../assetDragAndDrop/assetDragAndDrop';
import { useFlash, useLogger } from '../../hooks';
import { unauthClient as client } from '../../pages/_app';
import { CreateProjectAssetsInput } from '../../API';
import { createProjectAssets } from '../../graphql/mutations';
import { ProjectAsset } from '../../types/custom';
import { Protected } from '../protected/protected';
import { truncate } from '../../helpers/util';
import { Features } from '../../permissions';
import Button from '../button';

const applicationToIcon: any = {
  figma: <FigmaIcon />,
  framer: <FramerIcon />,
  excel: <ExcelIcon />,
  miro: <MiroIcon />,
  ai: <AiIcon />,
  dropbox: <DropboxIcon />,
};

interface FilesTabProps {
  files: ProjectAsset[];
  projectID: string;
  refetchData: () => void;
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
    let { url } = file;
    if (url) {
      if (!url.match(/^https?:\/\//i)) {
        url = `http://${url}`;
      }
      window.open(url, '_blank');
    } else {
      try {
        const asset = await Storage.get(file.asset.key);
        downloadURI(asset, file.fileName);
      } catch (error) {
        setFlash("Something went wrong. We're looking into it");
        logger.error('FilesTab: error fetching image from S3', { error, input: JSON.stringify(file) });
      }
    }
  };
  
  return (
    <>
      <Protected feature={Features.FileModalContent}>
        <div className={classnames(modalStyles.addNew)}>
          <InPlaceModal button={<FontAwesomeIcon color="#3C78FB" icon={faCirclePlus} />}>
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
  close?: () => void;
  projectID: string;
  refetchData: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ close, projectID, refetchData }) => {
  const [fileUrl, setFileUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const { logger } = useLogger();
  const { setFlash } = useFlash();
  const ref = useRef<HTMLInputElement>(null);

  const checkRef = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  function handleAddFile(e: KeyboardEvent) {
    if (e.keyCode === 13 && fileUrl) {
      setFiles((oldFiles) => [...oldFiles, { url: fileUrl }]);
      // fetch(fileUrl)
      //   .then((res) => res.blob())
      //   .then((blob) => {
      //     const file = new File([blob], `downloaded_${blob.type.split('/')[0]}.${blob.type.split('/')[1]}`, { type: blob.type });
      //     setFiles((oldFiles) => [...oldFiles, file]);
      //   })
      //   .catch(() => {
      //     setFlash("We can't download that file for you, sorry.");
      //   });
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

  const uploadLink = async () => {
    const createProjectAssetsInput: CreateProjectAssetsInput = {
      projectID,
      url: fileUrl,
    };
    try {
      const response = await client.mutate({
        mutation: gql(createProjectAssets),
        variables: { input: createProjectAssetsInput },
      });
    } catch (error) {
      setFlash("Something went wrong. We're looking into it");
      logger.error('FilesTabModalContent: error creating ProjectAsset', { error, input: createProjectAssetsInput });
    }
  };

  const uploadFiles = async () => {
    setIsSaving(true);
    const uploadPromises = [];
    let createProjectAssetsInput: CreateProjectAssetsInput;
    for (const file of files) {
      if (fileUrl) {
        await uploadLink();
      }
      const s3Key = `${uuid()}-${file.name}`;

      createProjectAssetsInput = {
        projectID,
        asset: { key: s3Key },
        fileName: file.name,
      };
      uploadPromises.push(
        Storage.put(s3Key, file, { contentDisposition: `attachment;filename=${file.name}` }),
      );

      try {
        await client.mutate({
          mutation: gql(createProjectAssets),
          variables: { input: createProjectAssetsInput },
        });
      } catch (error) {
        setFlash("Something went wrong. We're looking into it");
        logger.error('FilesTabModalContent: error creating ProjectAsset', { error, input: createProjectAssetsInput });
      }
    }
    if (fileUrl && uploadPromises.length === 0) {
      await uploadLink();
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
      <div className={classnames(styles.header)}>New Asset</div>
      <AssetDragAndDrop onDrop={handleFileDrop} />
      <div className={classnames(styles.label)}>Or, add URL:</div>
      <input
        className={classnames(styles.urlInput)}
        type="text"
        autoComplete="off"
        onKeyDown={handleAddFile}
        onChange={({ target }) => setFileUrl(target.value)}
        onBlur={({ target }) => setFileUrl(target.value.trim())}
        value={fileUrl}
        name="fileUrl"
      />
      <div className={classnames(styles.orBrowse)}>
        <div className={classnames(styles.or)}>Or</div>
        <input ref={ref} type="file" className={styles.fileInput} id="fileInput" multiple onChange={handleFileInputChange} />
        <Button
            onClick={() => checkRef()}
            inverted
          >
            Browse
          </Button>
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
      <div className={classnames(modalStyles.actionBar)}>
        <button onClick={() => close()} className={classnames(modalStyles.cancel)} type="button">
          Cancel
        </button>
        <Button
          onClick={uploadFiles}
          isLoading={isSaving}
          inverted
        >
          Save
        </Button>
      </div>
    </div>
  );
};

interface FilePillProps {
  file: ProjectAsset | any;
  onClick?: (event: React.KeyboardEvent<HTMLDivElement>, file) => void;
}

const FilePill: React.FC<FilePillProps> = ({ file, onClick }) => {
  const handleSelect = (e, f) => {
    if (e.keyCode === undefined || e.keyCode === 13) {
      if (onClick) onClick(e, f);
    }
  };

  const text = truncate((file.fileName || file.name || file.url), 30);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleSelect(e, file)}
      onClick={(e) => handleSelect(e, file)}
      className={classnames(modalStyles.modalPill)}
    >
      <div className={classnames(modalStyles.icon)}>
        {file.url
          ? <FontAwesomeIcon color="#828282" icon={faLink} />
          : <FontAwesomeIcon color="#828282" icon={faFileLines} />}
      </div>
      <div>{text}</div>
    </div>
  );
};
