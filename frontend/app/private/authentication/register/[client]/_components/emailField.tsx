"use client";

import styles from '@/app/private/authentication/styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

type EmailFieldProps = {
    value: string;
    onValueChange: (value: string) => void;
};

export default function EmailField({ value, onValueChange }: EmailFieldProps) {
    return (
        <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <div className={styles.input_wrap}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.fas} />
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={value}
                    onChange={(event) => onValueChange(event.currentTarget.value)}
                />
            </div>
        </div>
    );
}