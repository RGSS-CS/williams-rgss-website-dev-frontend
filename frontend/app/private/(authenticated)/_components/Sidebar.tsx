import styles from "@/app/private/(authenticated)/_styles/base/sidebar.module.css";
import type { Management } from "@/app/_lib/management";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SchoolLocation from "@/app/_utils/formatLocation";
//ICONS
import { faHouse, faUsers, faImages, faUser, faPhone, faEnvelope, faMap } from "@fortawesome/free-solid-svg-icons"

type NavbarProps = {
    management: Management | null;
};

export default function ExecSidebar({ management }: NavbarProps) {
    const [mapsUrl, displayAddress, regionLine] = SchoolLocation({ management });
    return (
        <aside className={styles.container}>
            <div className={styles.schoolID}>
                    <div className={styles.school_text}>
                        <span className={styles.school}>{management?.schoolName}</span>
                        <span className={styles.rank}>Exec Dashboard</span> {/*Replace exec dashboard with rank of member*/}
                    </div>
                <div className={styles.exec}>
                    <img src="https://i.pravatar.cc/80?img=47" alt="Maya Chen" />
                    <div className={styles.ID_info}>
                        <p>Random Dude <span>Grade 11 - 2027-2028</span></p>
                    </div>
                </div>
            </div>
            <div className={styles.nav_container}>
                <h5>Executive Settings</h5>
                <a className={styles.navLink}><FontAwesomeIcon icon={faHouse} className={styles.navI} /> Home</a>
                <a className={styles.navLink}><FontAwesomeIcon icon={faUsers} className={styles.navI} /> Your Clubs</a>
                <a className={styles.navLink}><FontAwesomeIcon icon={faImages} className={styles.navI} /> Your Gallery</a>
                <a className={styles.navLink}><FontAwesomeIcon icon={faUser} className={styles.navI} /> Account</a>
            </div>

            <div className={styles.schoolInfo}>
                <div className={styles.footerContainer}>
                    <div className={styles.location}>
                        <FontAwesomeIcon icon={faMap} />
                        {mapsUrl ? (
                            <>
                                <a
                                    href={mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.desktop_only}
                                >
                                    {displayAddress}
                                </a>
                                <a
                                    href={mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.mobile_only}
                                >
                                    Open In Google Maps
                                </a>
                            </>
                        ) : (
                            <a>Address unavailable</a>
                        )}
                    </div>
                    <div className={styles.phone}>
                        <FontAwesomeIcon icon={faPhone} />
                        <p>{management?.schoolPhone}</p>
                    </div>
                    <div className={styles.email}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <a href={`mailto:${management?.schoolEmail}`} target="_blank" rel="noopener noreferrer">{management?.schoolEmail}</a>
                    </div>
                </div>
            </div>
        </aside>
    );
}