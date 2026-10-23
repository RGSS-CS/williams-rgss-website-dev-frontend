import type { Management } from "@/app/_lib/site-management";
import { getPageManagement } from "@/app/_lib/page-management";
import { cookies } from "next/headers";
import NavbarClient from "@/app/_components/navbarClient";

type NavbarProps = {
  management: Management | null;
};

export default async function Navbar({ management }: NavbarProps) {
  const [cookieStore, pageSettings] = await Promise.all([cookies(), getPageManagement()]);
  const accessToken = cookieStore.get("access_token")?.value;
  const username = cookieStore.get("account_username")?.value;
  const authUser = accessToken && username ? { username } : null;

  return <NavbarClient management={management} pageSettings={pageSettings} authUser={authUser} />;
}
