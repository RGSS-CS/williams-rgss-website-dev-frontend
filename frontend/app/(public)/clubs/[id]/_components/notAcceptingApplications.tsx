import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import styles from "../club-detail.module.css";

export default function NotAcceptingApplications() {
  return (
    <section className={styles.applicationsClosedSection} aria-labelledby="applications-closed-heading" role="status">
      <div className={styles.applicationsClosedCard}>
        <div className={styles.applicationsClosedIcon} aria-hidden="true">
          <FontAwesomeIcon icon={faCircleExclamation} />
        </div>

        <div>
          <span className={styles.applicationsClosedEyebrow}>Applications currently closed</span>
          <h2 id="applications-closed-heading">Not accepting applications</h2>
          <p>This club is not accepting new applications right now. Check back later for updates.</p>
        </div>
      </div>
    </section>
  );
}
