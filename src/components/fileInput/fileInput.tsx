import styles from './fileInput.module.scss';

interface FileInputProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function
}

export const FileInput: React.FC<FileInputProps> = ({ name, onChange }) => (
  <label className={styles.browseButton} htmlFor={`${name}-fileInput`}>
    <input
      type="file"
      className={styles.fileInput}
      id={`${name}-fileInput`}
      multiple
      onChange={(e) => onChange(e)}
    />
    <div className="oval-btn-3">Browse</div>
  </label>
);
