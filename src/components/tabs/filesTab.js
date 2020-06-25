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

export function FilesTab({ files }) {
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
              <EditIcon />
              <div className="mls">
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
      <div className={styles.upload}>
        <input
          type="text"
          placeholder="Paste URL or Drag and Drop a File"
          className="input-light"
        />
        <AddFileButton />
      </div>
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
