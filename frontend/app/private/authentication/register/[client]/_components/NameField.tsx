"use client";

import styles from '@/app/private/authentication/styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function NameField() {
    return (
        <>
            <div className={styles.form_group}>
                <label htmlFor="first_name">Name</label>
                <div className={styles.input_wrap}>
                    <FontAwesomeIcon icon={faUser} className={styles.fas} />
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        autoComplete="given-name"
                    />
                </div>
            </div>
            <div className={styles.form_group}>
                <div className={styles.input_wrap}>
                    <FontAwesomeIcon icon={faUser} className={styles.fas} />
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="family-name"
                    />
                </div>
            </div>
        </>
    );
}
