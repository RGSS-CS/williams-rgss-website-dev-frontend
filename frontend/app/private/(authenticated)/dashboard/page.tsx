import { getManagementSettings } from "@/app/_lib/management";
import { getSiteMetadata } from "@/app/_utils/metadata";
import { Metadata } from "next";
import styles from "./dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ICONS
import { faGripLines } from "@fortawesome/free-solid-svg-icons"

export async function generateMetadata(): Promise<Metadata> {
    return getSiteMetadata("Exec Dashboard");
}

export default async function ExecDashboard() {
    const management = await getManagementSettings();

    return (
        <main>
            <div className={styles.container}>
                <header className={styles.topbar}>
                    <div className={styles.link}>
                        <FontAwesomeIcon icon={faGripLines} />
                        <h4><b>Dashboard</b></h4>
                    </div>
                    <div className={styles.description}>
                        <span className={styles.welcome}>
                            Welcome back User {/*TODO: replace with user name*/}
                        </span>
                    </div>
                </header>
                <div className={styles.content}>
                    <div className={styles.headerContent}>
                        <h2>Overview</h2>
                    </div>
                    <div className={styles.add_club}>
                        {/* TODO: Make component for it*/}
                    </div>
                    <div className={styles.clubs}>
                        {/*TODO: make components for it*/}
                    </div>
                </div>
            </div>
        </main>
    );
}