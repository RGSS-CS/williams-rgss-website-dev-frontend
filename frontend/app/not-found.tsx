import Image from "next/image";
import Link from "next/link";

import styles from "@/app/_modules/not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.content}>
      <div className={styles.gif_stage}>
        <div className={styles.overlay_404}>
          <div className={styles.num_404}>
            4<span>0</span>4
          </div>
        </div>
        <div className={styles.gif_frame}>
          <Image src="/images/gifs/meowl.gif" alt="meow" width={640} height={360} unoptimized />
        </div>
      </div>

      <div className={styles.copy}>
        <h1>Page not found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist or may have been moved. Head back to safety.</p>
      </div>

      <div className={styles.actions}>
        <Link href="/" className={styles.btn_home}>
          <i className="fa-solid fa-house"></i>
          Go to Home
        </Link>
      </div>
    </main>
  );
}
