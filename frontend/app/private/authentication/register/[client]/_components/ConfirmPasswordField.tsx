"use client";

import styles from '@/app/private/authentication/styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

export default function ConfirmPasswordField() {
  return (
    <div className={styles.form_group}>
      <div>
        <label htmlFor="confirm_password">Confirm Password</label>
        <div className={styles.input_wrap}>
          <FontAwesomeIcon icon={faKey} className={styles.fas} />
          <input
            id="confirm_password"
            name="confirm_password"
            placeholder="Confirm Password"
            autoComplete="current-password"
          />
        </div>
      </div>
    </div>
  );
}
