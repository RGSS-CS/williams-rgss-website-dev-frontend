import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import styles from "@/app/not-found.module.css";
import Navbar from "./(public)/_components/navbar/navbar";
import Footer from "./(public)/_components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Icons
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { getManagementSettings } from "./_lib/management";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

async function NotFoundChrome({ children }: { children: React.ReactNode }) {
  const management = await getManagementSettings();
  if (!management) return <main>{children}</main>;
  return (
    <main>
      <Navbar management={management} />
      {children}
      <Footer management={management} />
    </main>
  );
}

function NotFoundFallback({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}

export default function NotFound() {
  const content = (
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
        <Link href="/" className={styles.btn_home} prefetch={false}>
          <FontAwesomeIcon icon={faHouse} />
          Go to Home
        </Link>
      </div>
    </div>
  );

  return (
    <Suspense fallback={<NotFoundFallback>{content}</NotFoundFallback>}>
      <NotFoundChrome>{content}</NotFoundChrome>
    </Suspense>
  );
}