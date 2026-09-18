import PublicHeroLoading from "@/app/(public)/_components/publicHeroLoading";
import styles from "./home.module.css";

export default function Loading() {
    return (
        <main aria-busy='true' aria-label='Loading homepage'>
            <PublicHeroLoading badge buttons tag ticker />
            {["Announcements", "Events", "Meet the Council"].map((title) => (
                <div className={styles.sectionWrap} key={title}>
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent} />
                            {title}
                        </h2>
                    </div>
                    {title !== "Events" && (
                        <div className={styles.cardContainer}>
                            <div className={styles.cardRow} />
                        </div>
                    )}
                </div>
            ))}
        </main>
    );
}
