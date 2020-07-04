import { useState, FormEvent } from 'react';
import styles from './createAPassword.module.scss';
import Lock from '../../img/lock.svg';

export function CreateAPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSave(e: FormEvent) {
    e.preventDefault();
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <form onSubmit={handleSave} className={styles.createAPassword}>
      <Lock />
      <div className={styles.header}>CREATE A PASSWORD</div>
      <div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        />
      </div>
      <div>
        <input
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Password again"
        />
      </div>
      <div className={styles.buttonContainer}>
        <button type="button" onClick={handleSave} className="oval-btn">
          SAVE
        </button>
      </div>
    </form>
  );
}
