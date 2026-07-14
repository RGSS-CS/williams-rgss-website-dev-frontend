import styles from "@/app/private/(authenticated)/_styles/base/sidebar.module.css";
import type { Management } from "@/app/_lib/management";

type NavbarProps = {
  management: Management | null;
}

export default function ExecSidebar({ management }: NavbarProps) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.schoolID}>
                <div className={styles.containerTop}>
                    <div className={styles.icon}>
                        {/*PUT SOMETHING HERE*/}
                    </div>
                    <div className={styles.school_text}>
                        <span className={styles.school}>{management?.schoolName}</span>
                        <span className={styles.rank}>Exec Dashboard</span>
                    </div>
                </div>
                <div className={styles.containerBottom}>
                    <img src="https://i.pravatar.cc/80?img=47" alt="Maya Chen" />
                    <div className={styles.ID_info}>
                        Random Dude <span>Grade 11 - 2027-2028</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}