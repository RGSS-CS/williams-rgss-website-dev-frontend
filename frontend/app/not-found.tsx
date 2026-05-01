import Link from 'next/link'
import Image from 'next/image'
import styles from '@/app/_modules/not-found.module.css'

export default function NotFound() {
    return (
        <body>
            <div className={styles.content}>
                <div className={styles.gif_stage}>
                    <div className={styles.overlay_404}>
                        <div className={styles.num_404}>4<span>0</span>4</div>
                    </div>
                    <div className={styles.gif_frame}>
                        <img src="/images/gifs/meowl.gif" alt="meow"></img>
                    </div>
                </div>

                <div className={styles.copy}>
                    <h1>😨</h1>
                    <p>The page you're looking for doesn't exist or may have been moved. Head back to safety.</p>
                </div>

                <div className={styles.actions}>
                    <a href="/" className={styles.btn_home}>
                        <i className="fa-solid fa-house"></i>
                        Go to Home
                    </a>
                </div>
            </div>
        </body>
    )
}