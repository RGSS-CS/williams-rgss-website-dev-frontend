import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import "@/app/not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default async function NotFound() {
  return (
    <div className="content">
      <div className="gif_stage">
        <div className="overlay_404">
          <div className="num_404">
            4<span>0</span>4
          </div>
        </div>
        <div className="gif_frame">
          <Image src="/images/gifs/meowl.gif" alt="meow" width={640} height={360} unoptimized />
        </div>
      </div>

      <div className="copy">
        <h1>Page not found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist or may have been moved. Head back to safety.</p>
      </div>

      <div className="actions">
        <Link href="/" className="btn_home">
          <i className="fa-solid fa-house"></i>
          Go to Home
        </Link>
      </div>
    </div>
  );
}
