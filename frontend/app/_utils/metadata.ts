import { cacheLife } from "next/cache";
import { getManagementSettings } from "../_lib/management";

export async function getSiteMetadata(pageTitle?: string) {
  "use cache";
  cacheLife("hours");

  const management = await getManagementSettings();
  const schoolName = management?.schoolName;
  const councilName = management?.councilName;

  const siteTitle = `${schoolName} ${councilName}`.trim();

  return {
    title: pageTitle ? `${pageTitle} - ${siteTitle}` : siteTitle,
    description: `This is the School Council Website of ${schoolName}`,
  };
}
