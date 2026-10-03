import type { Metadata } from "next";
import { getLegalDocuments } from "@/app/_lib/legal";
import { getSiteMetadata } from "@/app/_utils/metadata";
import "../styles.css";

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata('Terms and Conditions');
}

export default async function TermsConditionsPage() {
    const legal = await getLegalDocuments();

    return (
        <main className="legalPage">
            <article className="legalDocument">
                <h1>Terms of Service</h1>
                {legal?.lastUpdated && (
                    <p className="legalUpdated">
                        Last updated: {new Date(legal.lastUpdated).toLocaleDateString("en-CA", { dateStyle: "long" })}
                    </p>
                )}
                {legal?.termsService ? (
                    <div className="legalText">
                        {legal.termsService.split(/\r?\n\s*\r?\n/).map((paragraph, index) => {
                            const text = paragraph.trim();
                            if (!text) return null;
                            return <p key={index}>{text}</p>;
                        })}
                    </div>
                ) : (
                    <p>The Terms of Service are currently unavailable. Please try again later.</p>
                )}
            </article>
        </main>
    );
}
