"use client";

import { useState } from 'react';
import styles from '@/app/private/authentication/styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function ConfirmPasswordField() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((current) => !current);
  };

  return (
    <div className={styles.form_group}>
      <div>
        <label htmlFor="confirm_password">Confirm Password</label>
        <div className={styles.input_wrap}>
          <FontAwesomeIcon icon={faKey} className={styles.fas} />
          <input
            id="confirm_password"
            name="confirm_password"
            type={isVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
            autoComplete="current-password"
          />
          <button
            className={styles.toggle_pw}
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isVisible}
          >
            <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} className={styles.fas} />
          </button>
        </div>
      </div>
    </div>
  );
}
