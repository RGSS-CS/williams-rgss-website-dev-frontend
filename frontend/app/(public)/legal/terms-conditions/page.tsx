import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Suspense } from "react";
import { getLegalDocuments } from "@/app/_lib/legal";
import { getSiteMetadata } from "@/app/_utils/metadata";
import "../styles.css";

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata("Terms and Conditions");
}

async function TermsConditionsContent() {
  const legal = await getLegalDocuments();

  return (
    <>
      {legal?.lastUpdated && (
        <p className='legalUpdated'>
          Last updated:{" "}
          {new Date(legal.lastUpdated).toLocaleDateString("en-CA", { dateStyle: "long" })}
        </p>
      )}
      {legal?.termsService ? (
        <div className='legalText'>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{legal.termsService}</ReactMarkdown>
        </div>
      ) : (
        <p>The Terms of Service are currently unavailable. Please try again later.</p>
      )}
    </>
  );
}

export default function TermsConditionsPage() {
  return (
    <main className='legalPage'>
      <article className='legalDocument'>
        <Suspense fallback={<p role='status'>Loading the Terms of Service…</p>}>
          <TermsConditionsContent />
        </Suspense>
      </article>
    </main>
  );
}
