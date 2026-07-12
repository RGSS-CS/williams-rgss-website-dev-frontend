import { Montserrat, Jost, Space_Grotesk, Figtree, IBM_Plex_Sans, Quicksand } from "next/font/google";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import "@/app/global.css";
import { getManagementSettings } from "@/app/_lib/management";
import darkenHex from "@/app/_utils/colorLightenDarken";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
config.autoAddCss = false

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

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const themeStyle = await getThemeStyle();

    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            className={`${montserrat.variable} ${jost.variable} ${spaceGrotesk.variable} ${figtree.variable} ${ibmPlexSans.variable} ${quicksand.variable}`}
        >
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <style id="school-theme" dangerouslySetInnerHTML={{ __html: themeStyle }} />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
};