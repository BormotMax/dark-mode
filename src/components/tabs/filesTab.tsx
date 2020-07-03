import { useState, KeyboardEvent, ChangeEvent, DragEvent } from 'react'
import tabStyle from './tab.module.scss'
import {
  AiIcon,
  DropboxIcon,
  FramerIcon,
  MiroIcon,
  ExcelIcon,
  FigmaIcon,
} from '../../img/icons'
import styles from './filesTab.module.scss'
import EditIcon from '../../img/editIcon.svg'
import DeleteIcon from '../../img/deleteIcon.svg'
import AddFileButton from '../../img/addFileButton.svg'
import AddFileButtonHover from '../../img/addFileButtonHover.svg'

const applicationToIcon: any = {
  figma: <FigmaIcon />,
  framer: <FramerIcon />,
  excel: <ExcelIcon />,
  miro: <MiroIcon />,
  ai: <AiIcon />,
  dropbox: <DropboxIcon />,
}

interface File {
  id: number
  application: string
  title: string
}

interface FilesTabProps {
  files: Array<File>
}

export function FilesTab({ files }: FilesTabProps) {
  const [fileName, setFileName] = useState('')

  function handleDeleteFile(id: number) {
    console.log(`Deleting file with ID: ${id}`)
  }

  function handleEditFile(id: number) {
    console.log(`Editing file with ID: ${id}`)
  }

  function handleAddFile(e: KeyboardEvent) {
    if (e.keyCode === 13 && fileName) {
      fetch(fileName)
        .then((res) => res.blob())
        .then((res) => {
          const urlCreator = window.URL || window.webkitURL
          const objectUrl = urlCreator.createObjectURL(res)
        })
      setFileName('')
    }
  }

  function handleFileDrop(e: DragEvent) {
    e.preventDefault()
  }

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files)
  }

  return (
    <div className={`${tabStyle.genericTab} ${styles.filesTab}`}>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <div className="li__bullet">
              {applicationToIcon[file.application]}
            </div>
            <div className={styles.liText}>{file.title}</div>
            <div className={styles.icons}>
              <div onKeyDown={() => handleEditFile(file.id)} tabIndex={0} role="button" onClick={() => handleEditFile(file.id)}>
                <EditIcon />
              </div>
              <div onKeyDown={() => handleDeleteFile(file.id)} tabIndex={0} role="button" onClick={() => handleDeleteFile(file.id)} className="mls">
                <DeleteIcon />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.uploadText}>Uploading &apos;Ideas.sketch&apos;...</div>
      <progress
        className="progress is-large is-primary"
        max="100"
        value={40}
      />
      <form
        className={styles.upload}
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          autoComplete="off"
          placeholder="Paste URL or Drag and Drop a File"
          className="input-light"
          onKeyDown={handleAddFile}
          onChange={({ target }) => setFileName(target.value)}
          value={fileName}
        />
        <label htmlFor="fileInput">
          <input
            type="file"
            className={styles.fileInput}
            id="fileInput"
            multiple
            onChange={handleFileInputChange}
          />
          <div className={styles.addFileButtonGroup}>
            <div className={styles.addFileButton}>
              <AddFileButton />
            </div>
            <div className={styles.addFileButtonHover}>
              <AddFileButtonHover />
            </div>
          </div>
        </label>
      </form>
    </div>
  )
}
