import { Suspense } from "react";
import Footer from "@/app/(public)/_components/footer";
import Navbar from "@/app/(public)/_components/Nvbar";
import { getManagementSettings } from "@/app/_lib/site-management";
import styles from "@/app/private/authentication/styles.module.css";

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const management = await getManagementSettings();

  if (!management) {
    return <>{children}</>;
  }

  return (
    <>
      <Suspense>
        <Navbar management={management} />
      </Suspense>
      {children}
      <div className={styles.footerWrap}>
        <Suspense>
          <Footer management={management} />
        </Suspense>
      </div>
    </>
  );
}
