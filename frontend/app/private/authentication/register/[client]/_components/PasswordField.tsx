"use client";

import styles from '@/app/private/authentication/authentication.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

export default function PasswordField() {
  return (
    <div className={styles.form_group}>
      <div>
        <label htmlFor="password">Password</label>
        <div className={styles.input_wrap}>
          <FontAwesomeIcon icon={faKey} className={styles.fas} />
          <input
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>
      </div>
    </div>
  );
}
