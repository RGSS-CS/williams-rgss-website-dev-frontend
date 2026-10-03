import type { Metadata } from "next";
import { getLegalDocuments } from "@/app/_lib/legal";
import { getSiteMetadata } from "@/app/_utils/metadata";
import "../styles.css";

export async function generateMetadata(): Promise<Metadata> {
  return getSiteMetadata('Privacy Policy');
}

export default async function PrivacyPolicyPage() {
    const legal = await getLegalDocuments();

    return (
        <main className="legalPage">
            <article className="legalDocument">
                <h1>Privacy Policy</h1>
                {legal?.lastUpdated && (
                    <p className="legalUpdated">
                        Last updated: {new Date(legal.lastUpdated).toLocaleDateString("en-CA", { dateStyle: "long" })}
                    </p>
                )}
                {legal?.privacyPolicy ? (
                    <div className="legalText">
                        {legal.privacyPolicy.split(/\r?\n\s*\r?\n/).map((paragraph, index) => {
                            const text = paragraph.trim();
                            if (!text) return null;
                            return <p key={index}>{text}</p>;
                        })}
                    </div>
                ) : (
                    <p>The Privacy Policy is currently unavailable. Please try again later.</p>
                )}
            </article>
        </main>
    );
}
