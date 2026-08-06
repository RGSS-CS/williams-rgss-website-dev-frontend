"use client";

import styles from '@/app/private/authentication/styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

export default function PasswordField() {
  return (
    <div className={styles.form_group}>
      <div>
        <span className={styles.passwordLabel}><label htmlFor="password">Password </label><h4><strong>DO NOT USE YOUR SCHOOL PASSWORD</strong></h4></span>
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
