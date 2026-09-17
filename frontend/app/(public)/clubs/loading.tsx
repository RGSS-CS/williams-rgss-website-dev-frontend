import ClubsContentLoading from "./_components/clubsContentLoading";
import styles from "./clubs.module.css";

export default function Loading() {
    return (
        <main className={styles.page}>
            <ClubsContentLoading />
        </main>
    );
}
