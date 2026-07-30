import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "@/app/private/authentication/authentication.module.css";

//Icons
import { faKey, faEye } from '@fortawesome/free-solid-svg-icons';


export default function PasswordInput() {
    return (
        <div>
            <label htmlFor="password">Password</label>
            <div className={styles.input_wrap}>
                <FontAwesomeIcon icon={faKey} className={styles.fas} />
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                />
                <button
                    className={styles.toggle_pw}
                    id="togglePw"
                    type="button"
                    aria-label="Toggle password visibility"
                >
                    <FontAwesomeIcon icon={faEye} className={styles.fas} />
                </button>
            </div>
        </div>
    )
}