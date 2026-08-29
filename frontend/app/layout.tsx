import {
    Montserrat,
    Jost,
    Space_Grotesk,
    Figtree,
    IBM_Plex_Sans,
    Quicksand
} from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/app/global.css";
import { getManagementSettings } from "@/app/_lib/site-management";
import { ENTRY_CAPTCHA_COOKIE } from "@/app/_lib/captcha";
import darkenHex from "@/app/_utils/colorLightenDarken";
import RegisterSW from "@/app/_components/registerSW";
import EntryCaptchaGate from "@/app/_components/entryCaptchaGate";
import { isCaptchaEnabledFor } from "@/app/_utils/checkCaptchaEnabled";
import { cacheLife, cacheTag } from "next/cache";
import { cookies } from "next/headers";
import type { Metadata } from "next";

/* import all the icons in Free Solid, Free Regular, and Brands styles */
config.autoAddCss = false;

async function getThemeVariables(): Promise<React.CSSProperties> {
    "use cache";
    cacheLife("hours");
    cacheTag("management");

    const management = await getManagementSettings();

    const primary = management?.schoolPrimaryColor ?? "#000000";
    const secondary = management?.schoolSecondaryColor ?? "#000000";
    const tertiary = management?.schoolTertiaryColor ?? "#000000";

    const primaryLight = darkenHex(primary, -20);
    const tertiaryDark = darkenHex(tertiary, 20);

    return {
        "--school-primary": primary,
        "--school-primary-light": primaryLight,
        "--school-secondary": secondary,
        "--school-tertiary": tertiary,
        "--school-tertiary-dark": tertiaryDark,
    } as React.CSSProperties;
}

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

export async function generateMetadata(): Promise<Metadata> {
    "use cache: remote";
    cacheLife("hours");
    cacheTag("management");
    const management = await getManagementSettings();

    return {
        icons: management?.croppedFavicon ? { icon: management.croppedFavicon } : undefined,
    };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const [themeStyle, management] = await Promise.all([
        getThemeVariables(),
        getManagementSettings(),
    ]);
    const enteringCaptchaEnabled = isCaptchaEnabledFor(management, "ENTERING");
    const entryCaptchaComplete = enteringCaptchaEnabled
        ? (await cookies()).get(ENTRY_CAPTCHA_COOKIE)?.value === "true"
        : false;

    return (
        <html
            lang='en'
            className={`${montserrat.variable} ${jost.variable} ${spaceGrotesk.variable} ${figtree.variable} ${ibmPlexSans.variable} ${quicksand.variable}`}
            style={themeStyle}
        >
            <head></head>
            <body>
                <RegisterSW />
                <EntryCaptchaGate
                    enabled={enteringCaptchaEnabled}
                    initialComplete={entryCaptchaComplete}
                    schoolName={management?.schoolName}
                >
                    <div className='notOfficalContainer'>
                        <div className='notOffcial'>
                            <h1>
                                This website is currently not officially assosiated with Dr. GW Williams S.S or
                                Richmond Green S.S
                            </h1>
                        </div>
                    </div>
                    {children}
                </EntryCaptchaGate>
            </body>
        </html>
    );
}
