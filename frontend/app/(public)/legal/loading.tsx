import "./styles.css";

export default function LegalLoading() {
    return (
        <main className="legalPage" aria-busy="true" aria-live="polite">
            <article className="legalDocument">
                <h1>Loading document…</h1>
                <p role="status">Please wait while the document loads.</p>
            </article>
        </main>
    );
}
