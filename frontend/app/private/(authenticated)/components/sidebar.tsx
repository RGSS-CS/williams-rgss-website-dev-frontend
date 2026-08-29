import styles from "@/app/private/(authenticated)/styles/sidebar.module.css";
import type { Management } from "@/app/_lib/site-management";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SchoolLocation from "@/app/_utils/formatLocation";
import { getSchoolYear } from "@/app/_utils/schoolYear";
//ICONS
import {
    faHouse,
    faUsers,
    faImages,
    faUser,
    faPhone,
    faEnvelope,
    faMap
} from "@fortawesome/free-solid-svg-icons";

type SidebarProps = {
    management: Management | null;
};

export default function Sidebar({ management }: SidebarProps) {
    const [mapsUrl, displayAddress] = SchoolLocation({ management });
    const schoolYear = getSchoolYear();
    return (
        <aside className={styles.sidebar}>
            <div className={styles.schoolIdentity}>
                <div className={styles.schoolText}>
                    <span className={styles.school}>{management?.schoolName}</span>
                    <span className={styles.rank}>Exec Dashboard</span>{" "}
                    {/*Replace exec dashboard with rank of member*/}
                </div>
                <div className={styles.userCard}>
                    <img src="https://i.pravatar.cc/80?img=47" alt="Maya Chen" />
                    <div className={styles.userInfo}>
                        <p>
                            Random Dude <span>Grade 11 - {schoolYear}</span>
                        </p>
                    </div>
                </div>
            </div>
            <nav className={styles.navigation}>
                <h5>Executive Settings</h5>
                <a className={styles.navLink}>
                    <FontAwesomeIcon icon={faHouse} className={styles.navIcon} /> Home
                </a>
                <a className={styles.navLink}>
                    <FontAwesomeIcon icon={faUsers} className={styles.navIcon} /> Your Clubs
                </a>
                <a className={styles.navLink}>
                    <FontAwesomeIcon icon={faImages} className={styles.navIcon} /> Your Gallery
                </a>
                <a className={styles.navLink}>
                    <FontAwesomeIcon icon={faUser} className={styles.navIcon} /> Account
                </a>
            </nav>

            <div className={styles.schoolContact}>
                <div className={styles.contactList}>
                    <div className={styles.contactRow}>
                        <FontAwesomeIcon icon={faMap} />
                        {mapsUrl ? (
                            <>
                                <a
                                    href={mapsUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={styles.desktopOnly}
                                >
                                    {displayAddress}
                                </a>
                                <a
                                    href={mapsUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={styles.mobileOnly}
                                >
                                    Open In Google Maps
                                </a>
                            </>
                        ) : (
                            <a>Address unavailable</a>
                        )}
                    </div>
                    <div className={styles.contactRow}>
                        <FontAwesomeIcon icon={faPhone} />
                        <p>{management?.schoolPhone}</p>
                    </div>
                    <div className={styles.contactRow}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <a href={`mailto:${management?.schoolEmail}`} target='_blank' rel='noopener noreferrer'>
                            {management?.schoolEmail}
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}
