import tabStyle from "./tab.module.scss"
import {
  AiIcon,
  DropboxIcon,
  FramerIcon,
  MiroIcon,
  ExcelIcon,
  FigmaIcon,
} from "../../img/icons"
import EditIcon from "../../img/editIcon.svg"
import DeleteIcon from "../../img/deleteIcon.svg"
import AddFileButton from "../../img/addFileButton.svg"
import styles from "./filesTab.module.scss"
import { useState } from "react"

export function FilesTab({ files }) {
  const [fileName, setFileName] = useState("")

  function handleDeleteFile(id) {
    console.log(`Deleting file with ID: ${id}`)
  }

  function handleEditFile(id) {
    console.log(`Editing file with ID: ${id}`)
  }

  function handleAddFile(e) {
    if (e.keyCode === 13 && fileName) {
      console.log(`Adding file ${fileName}`)
      fetch(e.target.value)
        .then((res) => res.blob())
        .then((res) => {
          const urlCreator = window.URL || window.webkitURL
          const objectUrl = urlCreator.createObjectURL(res)
        })
      setFileName("")
    }
  }

  function handleFileDrop(e) {
    e.preventDefault()
    console.log("Dropping Files: ")
    console.log(e.dataTransfer.files)
  }

  function handleFileInputChange(e) {
    console.log("Adding files: ")
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
              <div onClick={() => handleEditFile(file.id)}>
                <EditIcon />
              </div>
              <div onClick={() => handleDeleteFile(file.id)} className="mls">
                <DeleteIcon />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.uploadText}>Uploading 'Ideas.sketch'...</div>
      <progress
        className="progress is-large is-primary"
        max="100"
        value={40}
      ></progress>
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
          <AddFileButton />
        </label>
      </form>
    </div>
  )
}

const applicationToIcon = {
  figma: <FigmaIcon />,
  framer: <FramerIcon />,
  excel: <ExcelIcon />,
  miro: <MiroIcon />,
  ai: <AiIcon />,
  dropbox: <DropboxIcon />,
}
