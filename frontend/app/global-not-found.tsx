import './global.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import Image from 'next/image'
import styles from './404.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist',
}

export default function GlobalNotFound() {
    return (
        <html>
            <head>
                <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                    crossOrigin='anonymous'
                    referrerPolicy='no-referrer'
                />
                {/* Google Fonts CDN Link */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />

            </head>
            <body>
                <div className={styles.content}>
                    <div className={styles.gif_stage}>
                        <div className={styles.overlay_404}>
                            <div className={styles.num_404}>4<span>0</span>4</div>
                        </div>
                        <div className={styles.gif_frame}>
                            <img src="/images/gifs/meowl.gif" alt="owl mixed with cat"></img>
                        </div>
                    </div>
                    <div className={styles.txt}>
                        <h1>😨</h1>
                        <p>The page you're looking for doesn't exist or may have been moved. Head back to safety</p>
                    </div>
                    <div className={styles.actions}>
                        <a href="/public" className={styles.btn_home}>
                            <i className='fas fa-solid fa-house'></i>
                            Go to Home
                        </a>
                    </div>
                </div>
            </body>
        </html>
    )
}