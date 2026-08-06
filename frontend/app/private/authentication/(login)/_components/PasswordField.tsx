"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from "@/app/private/authentication/styles.module.css";

export default function PasswordField() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((current) => !current);
  };

  return (
    <div className={styles.form_group}>
      <div>
        <label htmlFor="password">Password</label>
        <div className={styles.input_wrap}>
          <FontAwesomeIcon icon={faKey} className={styles.fas} />
          <input
            id="password"
            name="password"
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
          />
          <button
            className={styles.toggle_pw}
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
          >
            <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} className={styles.fas} />
          </button>
        </div>
      </div>
    </div>
  );
}
