import clubLoading from "@/app/(public)/_styles/loading/club-detail-loading.module.css";
import styles from "./loading.module.css";

export default function RegistrationLoading() {
    return (
        <main className={`authBody ${styles.loading}`} aria-busy="true" aria-label="Loading registration">
            <div className={styles.cardWrap}>
                <div className={`authCard ${clubLoading.skeleton}`} aria-hidden="true">
                    <div className={`${styles.block} ${styles.breadcrumbs}`} />
                    <div className={`${styles.block} ${styles.backButton}`} />
                    <div className="authCardHeader">
                        <div className={`${styles.block} ${styles.title}`} />
                        <div className={`${styles.block} ${styles.subtitle}`} />
                    </div>
                    {Array.from({ length: 5 }, (_, index) => (
                        <div className="authFieldGroup" key={index}>
                            {index !== 1 && <div className={`${styles.block} ${styles.label}`} />}
                            <div className={`${styles.block} ${styles.input}`} />
                        </div>
                    ))}
                    <div className={`${styles.block} ${styles.submit}`} />
                </div>
                <div className={styles.overlay}>
                    <div className={clubLoading.spinnerContainer} role="status">
                        <span className={clubLoading.spinner} aria-hidden="true" />
                        <span className={clubLoading.visuallyHidden}>Loading registration...</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
