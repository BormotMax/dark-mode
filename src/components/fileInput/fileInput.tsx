import styles from './fileInput.module.scss';

interface FileInputProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;
}

export const FileInput: React.FC<FileInputProps> = ({ name, onChange }) => (
  <label className={styles.browseButton} htmlFor={`${name}-fileInput`}>
    <input
      type="file"
      name={name}
      className={styles.fileInput}
      id={`${name}-fileInput`}
      accept="image/png, image/jpeg, image/gif, image/jpg"
      onChange={(e) => onChange(e)}
    />
    <div className="btn-small btn-invert">Browse</div>
  </label>
);
