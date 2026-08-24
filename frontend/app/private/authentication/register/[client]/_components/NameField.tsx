"use client";

import styles from '@/app/private/authentication/styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

type NameFieldProps = {
    firstName: string;
    lastName: string;
    onFirstNameChange: (value: string) => void;
    onLastNameChange: (value: string) => void;
};

export default function NameField({ firstName, lastName, onFirstNameChange, onLastNameChange }: NameFieldProps) {
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
                        value={firstName}
                        onChange={(event) => onFirstNameChange(event.currentTarget.value)}
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
                        value={lastName}
                        onChange={(event) => onLastNameChange(event.currentTarget.value)}
                    />
                </div>
            </div>
        </>
    );
}