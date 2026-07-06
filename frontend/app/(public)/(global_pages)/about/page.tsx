import styles from './about.module.css';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main>
            <section className="hero">
                <div className="hero_shape"></div>
                <div className="hero_inner">
                    <div className="hero_left">
                        <div className="hero_title">
                            <h1>About</h1>
                            <h2>STUCO</h2>
                        </div>
                        <div className="hero_subtitle">
                            <p>
                                Description
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.sectionWrap}>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            Goals
                        </h2>
                    </div>
                    <p className={styles.sectionLead}>
                        The Dr. G.W. Williams Secondary School Student Council is dedicated to the following core principles that guide everything we do.
                    </p>
                    <div className={styles.cardsGrid}>
                        <article className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}>
                                    <i className="fas fa-bullhorn"></i>
                                </span>
                                <h3 className={styles.cardTitle}>Advocacy</h3>
                            </div>
                            <p className={styles.cardText}>
                                Representing student interests and concerns to the school administration.
                            </p>
                        </article>
                        <article className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}>
                                    <i className="fas fa-heart"></i>
                                </span>
                                <h3 className={styles.cardTitle}>Inclusivity</h3>
                            </div>
                            <p className={styles.cardText}>
                                Promoting a welcoming and supportive environment for all students.
                            </p>
                        </article>
                        <article className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}>
                                    <i className="fas fa-star"></i>
                                </span>
                                <h3 className={styles.cardTitle}>Engagement</h3>
                            </div>
                            <p className={styles.cardText}>
                                Organizing events and activities that enhance school spirit and student life.
                            </p>
                        </article>
                        <article className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}>
                                    <i className="fas fa-lightbulb"></i>
                                </span>
                                <h3 className={styles.cardTitle}>Leadership</h3>
                            </div>
                            <p className={styles.cardText}>
                                Developing leadership skills among council members and inspiring student participation.
                            </p>
                        </article>
                        <article className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardIcon}>
                                    <i className="fas fa-handshake"></i>
                                </span>
                                <h3 className={styles.cardTitle}>Collaboration</h3>
                            </div>
                            <p className={styles.cardText}>
                                Working with students, staff, and the community to achieve common goals.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            <section className={styles.sectionWrap}>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            About Dr. G. W. Williams
                        </h2>
                    </div>
                    <div className={styles.cardsGrid}>
                        <article className={styles.infoCard}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-flag" aria-hidden="true"></i>
                            </span>
                            <h3 className={styles.cardTitle}>Founded</h3>
                            <p className={styles.cardText}>Serving students since 1990</p>
                        </article>
                        <article className={styles.infoCard}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                            </span>
                            <h3 className={styles.cardTitle}>Location</h3>
                            <p className={styles.cardText}>Aurora, Ontario</p>
                        </article>
                        <article className={styles.infoCard}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-users" aria-hidden="true"></i>
                            </span>
                            <h3 className={styles.cardTitle}>Community</h3>
                            <p className={styles.cardText}>Over 1,000 students</p>
                        </article>
                        <article className={styles.infoCard}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-paw" aria-hidden="true"></i>
                            </span>
                            <h3 className={styles.cardTitle}>Mascot</h3>
                            <p className={styles.cardText}>The Wildcats</p>
                        </article>
                    </div>
                </div>
            </section>

            <section className={styles.sectionWrap}>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            Meet the Council
                        </h2>
                    </div>
                    <p className={styles.sectionLead}>
                        The faces behind Williams STUCO — elected by students, working for students.
                    </p>
                    <div className={styles.memberGrid}>
                        <article className={styles.memberCard}>
                            <div className={styles.memberAvatar}>?</div>
                            <div>
                                <h3 className={styles.memberName}>Name Here</h3>
                                <p className={styles.memberRole}>President</p>
                            </div>
                        </article>
                        <article className={styles.memberCard}>
                            <div className={styles.memberAvatar}>?</div>
                            <div>
                                <h3 className={styles.memberName}>Name Here</h3>
                                <p className={styles.memberRole}>Vice President</p>
                            </div>
                        </article>
                        <article className={styles.memberCard}>
                            <div className={styles.memberAvatar}>?</div>
                            <div>
                                <h3 className={styles.memberName}>Name Here</h3>
                                <p className={styles.memberRole}>Secretary</p>
                            </div>
                        </article>
                        <article className={styles.memberCard}>
                            <div className={styles.memberAvatar}>?</div>
                            <div>
                                <h3 className={styles.memberName}>Name Here</h3>
                                <p className={styles.memberRole}>Treasurer</p>
                            </div>
                        </article>
                        <article className={styles.memberCard}>
                            <div className={styles.memberAvatar}>?</div>
                            <div>
                                <h3 className={styles.memberName}>Name Here</h3>
                                <p className={styles.memberRole}>Events Lead</p>
                            </div>
                        </article>
                        <article className={styles.memberCard}>
                            <div className={styles.memberAvatar}>?</div>
                            <div>
                                <h3 className={styles.memberName}>Name Here</h3>
                                <p className={styles.memberRole}>Communications</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className={styles.sectionWrap}>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            Contact Us
                        </h2>
                    </div>
                    <p className={styles.sectionLead}>
                        Have a question, a suggestion, or want to get involved? Reach out to us — we&apos;d love to hear from you.
                    </p>
                    <div className={styles.contactGrid}>
                        <article className={styles.contactItem}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-school" aria-hidden="true"></i>
                            </span>
                            <div>
                                <p className={styles.contactLabel}>School</p>
                                <p className={styles.contactText}>Dr. G.W. Williams Secondary School</p>
                            </div>
                        </article>
                        <article className={styles.contactItem}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                            </span>
                            <div>
                                <p className={styles.contactLabel}>Address</p>
                                <p className={styles.contactText}>11 Spring Farm Rd, Aurora, ON L4G 7W2</p>
                            </div>
                        </article>
                        <article className={styles.contactItem}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-phone" aria-hidden="true"></i>
                            </span>
                            <div>
                                <p className={styles.contactLabel}>Phone</p>
                                <a className={styles.contactLink} href="tel:9057273131">(905) 727-3131</a>
                            </div>
                        </article>
                        <article className={styles.contactItem}>
                            <span className={styles.cardIcon}>
                                <i className="fab fa-instagram" aria-hidden="true"></i>
                            </span>
                            <div>
                                <p className={styles.contactLabel}>Instagram</p>
                                <a className={styles.contactLink} href="#">@williams.stuco</a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section className={styles.sectionWrap}>
                <div className={styles.sectionContent}>
                    <div className={styles.sectionTitleRow}>
                        <h2 className={styles.sectionTitle}>
                            <span className={styles.sectionTitleAccent}></span>
                            Site Credits
                        </h2>
                    </div>
                    <p className={styles.sectionLead}>
                        This website was designed and developed by students under the <strong>RGSS-CS</strong> GitHub organization. Want to contribute?{' '}
                        <a className={styles.contactLink} href="https://github.com/RGSS-CS" target="_blank" rel="noopener noreferrer">
                            Open a PR on GitHub.
                        </a>
                    </p>
                    <div className={styles.creditsGrid}>
                        <article className={styles.creditCard}>
                            <h3 className={styles.cardTitle}>Maintainer Name</h3>
                            <span className={styles.creditRole}>Lead Developer</span>
                            <p className={styles.cardText}>
                                Frontend architecture, CI/CD pipeline, Azure deployment.
                            </p>
                            <a className={styles.contactLink} href="#" target="_blank" rel="noopener noreferrer">
                                <Image src="/images/icons_builtOn/github-light.svg" alt="GitHub" width={24} height={24} />
                            </a>
                        </article>
                        <article className={styles.creditCard}>
                            <h3 className={styles.cardTitle}>Maintainer Name</h3>
                            <span className={styles.creditRole}>Backend Developer</span>
                            <p className={styles.cardText}>
                                Django REST API, PostgreSQL schema, authentication.
                            </p>
                            <a className={styles.contactLink} href="#" target="_blank" rel="noopener noreferrer">
                                <Image src="/images/icons_builtOn/github-light.svg" alt="GitHub" width={24} height={24} />
                            </a>
                        </article>
                        <article className={styles.creditCard}>
                            <h3 className={styles.cardTitle}>Maintainer Name</h3>
                            <span className={styles.creditRole}>UI / UX Designer</span>
                            <p className={styles.cardText}>
                                Visual design, component system, accessibility.
                            </p>
                            <a className={styles.contactLink} href="#" target="_blank" rel="noopener noreferrer">
                                <Image src="/images/icons_builtOn/github-light.svg" alt="GitHub" width={24} height={24} />
                            </a>
                        </article>
                        <article className={styles.creditCard}>
                            <h3 className={styles.cardTitle}>Maintainer Name</h3>
                            <span className={styles.creditRole}>Content Editor</span>
                            <p className={styles.cardText}>
                                Club listings, event copy, photography coordination.
                            </p>
                            <a className={styles.contactLink} href="#" target="_blank" rel="noopener noreferrer">
                                <Image src="/images/icons_builtOn/github-light.svg" alt="GitHub" width={24} height={24} />
                            </a>
                        </article>
                    </div>
                    <div className={styles.techBadges}>
                        <span className={styles.techLabel}>Built with</span>
                        <div className={styles.badgeRow}>
                            <span className={styles.techBadge}>
                                <Image src="/images/icons_builtOn/nextjs-light.svg" alt="Next.js" width={24} height={24} />
                                Next.js
                            </span>
                            <span className={styles.techBadge}>
                                <Image src="/images/icons_builtOn/django.svg" alt="Django" width={24} height={24} />
                                Django
                            </span>
                            <span className={styles.techBadge}>
                                <Image src="/images/icons_builtOn/github-light.svg" alt="GitHub Actions" width={24} height={24} />
                                GitHub Actions
                            </span>
                            <span className={styles.techBadge}>
                                    <Image src="/images/icons_builtOn/google_fonts.svg" alt="Google Fonts" width={24} height={24} />
                                Google Fonts
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}