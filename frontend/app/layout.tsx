import { Montserrat, Jost, Space_Grotesk, Figtree, IBM_Plex_Sans } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)
config.autoAddCss = false


import "@/app/global.css";


const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["400", "600", "700", "800"],
});

const jost = Jost({
    subsets: ["latin"],
    variable: "--font-jost",
    weight: ["400", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
    subsets: ["latin"],
    variable: "--font-figtree",
    weight: ["400", "500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    variable: "--font-ibm-plex-sans",
    weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            className={`${montserrat.variable} ${ibmPlexSans.variable}`}
        >
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <link rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                    crossOrigin='anonymous'
                    referrerPolicy='no-referrer'
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
