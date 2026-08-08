import styles from "@/app/private/authentication/styles.module.css";

export default function Loading() {
    return (
        <main aria-busy="true" aria-label="Loading sign in">
            <div className={styles.body}>
                <div className={styles.loading_wrap}>
                    <div className={styles.login_card}>
                        <span className={`${styles.loading_block} ${styles.loading_logo}`}></span>
                        <div className={styles.card_header}>
                            <span className={`${styles.loading_block} ${styles.loading_title}`}></span>
                            <span className={`${styles.loading_block} ${styles.loading_subtitle}`}></span>
                        </div>
                        <span className={`${styles.loading_block} ${styles.loading_field}`}></span>
                        <span className={`${styles.loading_block} ${styles.loading_field_last}`}></span>
                        <span className={`${styles.loading_block} ${styles.loading_button}`}></span>
                    </div>
                </div>
            </div>
            <div className={styles.footer_skeleton} aria-hidden="true">
                <div className={styles.footer_skeleton_inner}>
                    <div className={styles.footer_skeleton_column}>
                        <span className={`${styles.loading_block} ${styles.footer_skeleton_title}`}></span>
                        <span className={`${styles.loading_block} ${styles.footer_skeleton_text}`}></span>
                        <span className={`${styles.loading_block} ${styles.footer_skeleton_text}`}></span>
                        <span className={`${styles.loading_block} ${styles.footer_skeleton_text}`}></span>
                    </div>
                    <div className={styles.footer_skeleton_column}>
                        <span className={`${styles.loading_block} ${styles.footer_skeleton_title}`}></span>
                        <span className={`${styles.loading_block} ${styles.footer_skeleton_text}`}></span>
                        <span className={`${styles.loading_block} ${styles.footer_skeleton_text}`}></span>
                    </div>
                </div>
                <span className={`${styles.loading_block} ${styles.footer_skeleton_bottom}`}></span>
            </div>
        </main>
    );
}
