import Image from "next/image";
import { Montserrat, Jost, Space_Grotesk, Figtree, IBM_Plex_Sans, Quicksand } from "next/font/google";
import type { Metadata } from "next";
import styles from "@/app/not-found.module.css";
import Navbar from "./(public)/_components/navbar/navbar";
import Footer from "./(public)/_components/footer/footer";
import { getManagementSettings } from "./_lib/management";
import darkenHex from "@/app/_utils/colorLightenDarken";
import "@/app/global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Icons
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

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


const FALLBACK_COLORS = {
  primary: "#0b1c3a",
  secondary: "#9ad9ea",
  tertiary: "#db9820",
};

const HEX_PATTERN = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

function safeHex(value: string | null | undefined, fallback: string): string {
  return value && HEX_PATTERN.test(value) ? value : fallback;
}

async function getThemeStyle(): Promise<string> {
  const management = await getManagementSettings();

  const primary = safeHex(management?.schoolPrimaryColor, FALLBACK_COLORS.primary);
  const secondary = safeHex(management?.schoolSecondaryColor, FALLBACK_COLORS.secondary);
  const tertiary = safeHex(management?.schoolTertiaryColor, FALLBACK_COLORS.tertiary);
  const primaryLight = darkenHex(primary, -20);
  const tertiaryDark = darkenHex(tertiary, 20);

  return `:root {
    --school-primary: ${primary};
    --school-primary-light: ${primaryLight};
    --school-secondary: ${secondary};
    --school-tertiary: ${tertiary};
    --school-tertiary-dark: ${tertiaryDark};
  }`;
};

export default async function NotFound() {
  const management = await getManagementSettings();
  if (!management) return null;
  const themeStyle = await getThemeStyle();
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${jost.variable} ${spaceGrotesk.variable} ${figtree.variable} ${ibmPlexSans.variable} ${quicksand.variable}`}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <style id="school-theme" dangerouslySetInnerHTML={{ __html: themeStyle }} />
      </head>
      <body>
        <Navbar management={management} />
        <div className={styles.content}>
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
            <a href="/" className={styles.btn_home}>
              <FontAwesomeIcon icon={faHouse} />
              Go to Home
            </a>
          </div>
        </div>
        <Footer management={management} />
      </body>
    </html>
  );
}
