import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Suspense } from "react";
import { getLegalDocuments } from "@/app/_lib/legal";
import { getSiteMetadata } from "@/app/_utils/metadata";
import "../styles.css";

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata("Privacy Policy");
}

async function PrivacyPolicyContent() {
  const legal = await getLegalDocuments();

  return (
    <>
      {legal?.lastUpdated && (
        <p className="legalUpdated">
          Last updated: {" "}
          {new Date(legal.lastUpdated).toLocaleDateString("en-CA", { dateStyle: "long" })}
        </p>
      )}
      {legal?.privacyPolicy ? (
        <div className="legalText">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{legal.privacyPolicy}</ReactMarkdown>
        </div>
      ) : (
        <p>The Privacy Policy is currently unavailable. Please try again later.</p>
      )}
    </>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="legalPage">
      <article className="legalDocument">
        <Suspense fallback={<p role="status">Loading the Privacy Policy…</p>}>
          <PrivacyPolicyContent />
        </Suspense>
      </article>
    </main>
  );
}
