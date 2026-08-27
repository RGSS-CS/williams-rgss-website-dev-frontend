import styles from "./navbarSkeleton.module.css";

export default function NavbarSkeleton() {
    return (
        <div className={styles.navbarContainer}>
            <nav className={styles.navbar}>
                <div className={styles.headerContainer}>
                    <div className={styles.titleContainer}>
                        <div className={styles.navHamburger}>
                            <span />
                            <span />
                            <span />
                        </div>

                        <div className={styles.brandLink}>
                            <div className={styles.logo}>
                                <div className={styles.logoSkeleton} />
                            </div>

                            <div className={styles.brandCopy}>
                                <div className={styles.schoolTitleSkeleton} />
                                <div className={styles.schoolSubtitleSkeleton} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.navLinks}>
                        <div className={styles.navLinkSkeleton} />
                        <div className={styles.navLinkSkeleton} />
                        <div className={styles.navLinkSkeleton} />
                        <div className={styles.navLinkSkeleton} />
                        <div className={styles.navLinkSkeleton} />
                    </div>
                </div>
            </nav>
        </div>
    );
}