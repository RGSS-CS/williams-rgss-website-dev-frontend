import styles from "./footer.module.css";

export default function Loading() {
  return <div className={styles.site_footer} style={{ minHeight: "220px" }} aria-busy="true" aria-hidden="true" />;
}
