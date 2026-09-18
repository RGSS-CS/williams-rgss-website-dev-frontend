import ClubsContentLoading from "../_components/clubsContentLoading";
import PublicHeroLoading from "@/app/(public)/_components/publicHeroLoading";
import styles from "../clubs.module.css";

export default function Loading() {
    return (
        <main className={styles.page}>
            <PublicHeroLoading breadcrumbs search />
            <ClubsContentLoading />
        </main>
    );
}
