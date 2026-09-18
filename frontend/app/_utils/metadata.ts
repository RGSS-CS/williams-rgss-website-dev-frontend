import { cacheLife, cacheTag } from "next/cache";
import { getManagementSettings } from "../_lib/site-management";
import { getStucoSettings } from "../_lib/stuco-settings";

export async function getSiteMetadata(pageTitle?: string) {
    "use cache";
    cacheLife("hours");
    cacheTag('management');

    const management = await getManagementSettings();
    const stuco = await getStucoSettings();
    
    const schoolName = management?.schoolName;
    const councilName = stuco?.councilName;

    const siteTitle = `${schoolName} ${councilName}`.trim();

    return {
        title: pageTitle ? `${pageTitle} - ${siteTitle}` : siteTitle,
        description: `This is the School Council Website of ${schoolName}`
    };
}
