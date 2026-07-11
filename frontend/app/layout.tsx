import { Montserrat, Jost, Space_Grotesk, Figtree, IBM_Plex_Sans, Quicksand } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import "@/app/global.css";
import Script from "next/script";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
config.autoAddCss = false

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

const quicksand = Quicksand({
    subsets: ["latin"],
    variable: "--font-quicksand",
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
            className={`${montserrat.variable} ${jost.variable} ${spaceGrotesk.variable} ${figtree.variable} ${ibmPlexSans.variable} ${quicksand.variable}`}
        >
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            </head>
            <body>
                <Script id="disable-sticky-hover" strategy="beforeInteractive">
                    {`document.addEventListener('touchstart', function () {}, false);`}
                </Script>
                {children}
            </body>
        </html>
    )
}
