"use client";

import styles from '@/app/private/authentication/authentication.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function StudentNumberField() {
  return (
    <div className={styles.form_group}>
      <label htmlFor="student_number">YRDSB Email</label>
      <div className={styles.input_wrap}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.fas} />
        <input
          id="student_number"
          name="student_number"
          type="email"
          placeholder="Student Number/Teacher Email"
        />
      </div>
    </div>
  );
}
