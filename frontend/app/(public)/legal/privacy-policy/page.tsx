import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getLegalDocuments } from "@/app/_lib/legal";
import { getSiteMetadata } from "@/app/_utils/metadata";
import "../styles.css";

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata("Privacy Policy");
}

export default async function PrivacyPolicyPage() {
  const legal = await getLegalDocuments();

  return (
    <main className='legalPage'>
      <article className='legalDocument'>
        <h1>Privacy Policy</h1>
        {legal?.lastUpdated && (
          <p className='legalUpdated'>
            Last updated:{" "}
            {new Date(legal.lastUpdated).toLocaleDateString("en-CA", { dateStyle: "long" })}
          </p>
        )}
        {legal?.privacyPolicy ? (
          <div className='legalText'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{legal.privacyPolicy}</ReactMarkdown>
          </div>
        ) : (
          <p>The Privacy Policy is currently unavailable. Please try again later.</p>
        )}
      </article>
    </main>
  );
}
