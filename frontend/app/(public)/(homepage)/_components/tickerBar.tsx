import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../home.module.css";
import { getStucoAnnouncements } from "@/app/_lib/stuco-settings";

//ICONS
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default async function TickerBar() {
  const announcements = await getStucoAnnouncements();
  const items = announcements.flatMap((announcement) => announcement.tickerItems);

  if (items.length === 0) return null;

  return (
    <div className={styles.tickerBar}>
      <div className={styles.tickerHeader}>
        <h3>
          <FontAwesomeIcon icon={faStar} /> Updates
        </h3>
      </div>

      <div className={styles.tickerTrack} tabIndex={0} role='region' aria-label='School updates'>
        <div className={styles.tickerInner}>
          {[false, true].map((duplicate) => (
            <ul
              className={styles.tickerItems}
              key={String(duplicate)}
              aria-hidden={duplicate || undefined}
            >
              {items.map((item, index) => (
                <h5 className={styles.tickerItem} key={index}>
                  {item}
                </h5>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
