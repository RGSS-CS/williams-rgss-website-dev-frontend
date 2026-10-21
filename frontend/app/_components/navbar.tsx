import type { Management } from "@/app/_lib/site-management";
import { getStucoSettings } from "@/app/_lib/stuco-settings";
import { cookies } from "next/headers";
import NavbarClient from "@/app/_components/navbarClient";

type NavbarProps = {
  management: Management | null;
};

export default async function Navbar({ management }: NavbarProps) {
  const [cookieStore, stucoSettings] = await Promise.all([cookies(), getStucoSettings()]);
  const accessToken = cookieStore.get("access_token")?.value;
  const username = cookieStore.get("account_username")?.value;
  const authUser = accessToken && username ? { username } : null;

  return (
    <NavbarClient
      management={management}
      councilName={stucoSettings?.councilName ?? ""}
      authUser={authUser}
    />
  );
}
