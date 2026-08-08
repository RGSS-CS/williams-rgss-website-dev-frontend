"use client";

import styles from '@/app/private/authentication/styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function StudentNumberField() {
  return (
    <div className={styles.form_group}>
      <label htmlFor="student_number">Student Number</label>
      <div className={styles.input_wrap}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.fas} />
        <input
          id="student_number"
          name="student_number"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Student Number"
          onInput={(event) => {
            const input = event.currentTarget;
            input.value = input.value.replace(/\D/g, '');
          }}
        />
      </div>
    </div>
  );
}
