import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/app/(public)/home.module.css";

//ICONS
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function TickerBar() {
    return (
        <div className={styles.tickerBar}>
            <div className={styles.tickerHeader}>
                <h3>
                    <FontAwesomeIcon icon={faStar} /> Updates
                </h3>
            </div>

            <div className="ticker_track">
                <div className="ticker_inner" id="ticker-inner"></div>
            </div>
        </div>
    );
}