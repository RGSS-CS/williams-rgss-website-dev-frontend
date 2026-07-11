import { cacheLife } from "next/cache";
import { getManagementSettings } from "./management";

const DEFAULT_SCHOOL_NAME = "School";
const DEFAULT_COUNCIL_NAME = "STUCO";

export async function getSiteMetadata(pageTitle?: string) {
  "use cache";
  cacheLife("hours");

  const management = await getManagementSettings();
  const schoolName = management?.schoolName || DEFAULT_SCHOOL_NAME;
  const councilName = management?.councilName || DEFAULT_COUNCIL_NAME;

  const siteTitle = `${schoolName} ${councilName}`.trim();

  return {
    title: pageTitle ? `${pageTitle} - ${siteTitle}` : siteTitle,
    description: `This is the School Council Website of ${schoolName}`,
  };
}
