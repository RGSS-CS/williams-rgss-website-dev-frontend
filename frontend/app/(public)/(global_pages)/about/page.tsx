import styles from './about.module.css';

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
                                We are a dedicated group of students committed to representing the interests and voices of our student body. Our goal is to foster a positive, inclusive, and engaging school community through leadership, service, and school spirit.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionEyebrow}>
                        <i className="fas fa-bullseye" aria-hidden="true"></i>
                        Our Mission
                    </span>
                    <h2 className={styles.sectionTitle}>Goals</h2>
                </div>
                <p className={styles.sectionLead}>
                    Our council brings students together through meaningful events, thoughtful representation, and projects that shape the Williams school experience.
                </p>
                <div className={styles.cardsGrid}>
                    <article className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-check"></i>
                            </span>
                            <h3 className={styles.cardTitle}>Elevate student voice</h3>
                        </div>
                        <p className={styles.cardText}>
                            We advocate for student priorities and build stronger communication between learners, staff, and administration.
                        </p>
                    </article>
                    <article className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-check"></i>
                            </span>
                            <h3 className={styles.cardTitle}>Create meaningful events</h3>
                        </div>
                        <p className={styles.cardText}>
                            Our council programs assemblies, spirit weeks, and community activities that bring Williams students together.
                        </p>
                    </article>
                    <article className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-check"></i>
                            </span>
                            <h3 className={styles.cardTitle}>Support school wellbeing</h3>
                        </div>
                        <p className={styles.cardText}>
                            We champion a safe, inclusive campus where every student feels heard, supported, and empowered.
                        </p>
                    </article>
                    <article className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardIcon}>
                                <i className="fas fa-check"></i>
                            </span>
                            <h3 className={styles.cardTitle}>Grow leadership skills</h3>
                        </div>
                        <p className={styles.cardText}>
                            Through service and collaboration, STUCO helps students develop confidence, teamwork, and initiative.
                        </p>
                    </article>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionEyebrow}>
                        <i className="fas fa-school"></i>
                        School Info
                    </span>
                    <h2 className={styles.sectionTitle}>About the School</h2>
                </div>
                <div className={styles.cardsGrid}>
                    <article className={styles.infoCard}>
                        <span className={styles.infoIcon}>
                            <i className="fas fa-school" aria-hidden="true"></i>
                        </span>
                        <h3 className={styles.cardTitle}>A proud community</h3>
                        <p className={styles.cardText}>
                            Dr. G.W. Williams Secondary School is home to a welcoming school community focused on learning and leadership.
                        </p>
                    </article>
                    <article className={styles.infoCard}>
                        <span className={styles.infoIcon}>
                            <i className="fas fa-handshake" aria-hidden="true"></i>
                        </span>
                        <h3 className={styles.cardTitle}>Student-led leadership</h3>
                        <p className={styles.cardText}>
                            Our council represents all grades and organizes programs that reflect the interests of the student body.
                        </p>
                    </article>
                    <article className={styles.infoCard}>
                        <span className={styles.infoIcon}>
                            <i className="fas fa-lightbulb" aria-hidden="true"></i>
                        </span>
                        <h3 className={styles.cardTitle}>Creative spirit</h3>
                        <p className={styles.cardText}>
                            We design campaigns and experiences that celebrate school pride, diversity, and student accomplishments.
                        </p>
                    </article>
                    <article className={styles.infoCard}>
                        <span className={styles.infoIcon}>
                            <i className="fas fa-hands-helping" aria-hidden="true"></i>
                        </span>
                        <h3 className={styles.cardTitle}>Community focus</h3>
                        <p className={styles.cardText}>
                            Service, support, and connection are at the centre of everything we do as a student council.
                        </p>
                    </article>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionEyebrow}>
                        <i className="fas fa-id-badge" aria-hidden="true"></i>
                        The Team
                    </span>
                    <h2 className={styles.sectionTitle}>Meet the Council</h2>
                </div>
                <p className={styles.sectionLead}>
                    The Williams Student Council is powered by student leaders who care deeply about school life, inclusion, and community events.
                </p>
                <div className={styles.memberGrid}>
                    <article className={styles.memberCard}>
                        <div className={styles.memberAvatar}>A</div>
                        <div>
                            <h3 className={styles.memberName}>Avery Chen</h3>
                            <p className={styles.memberRole}>Student Council President</p>
                        </div>
                    </article>
                    <article className={styles.memberCard}>
                        <div className={styles.memberAvatar}>J</div>
                        <div>
                            <h3 className={styles.memberName}>Jordan Patel</h3>
                            <p className={styles.memberRole}>Vice President</p>
                        </div>
                    </article>
                    <article className={styles.memberCard}>
                        <div className={styles.memberAvatar}>S</div>
                        <div>
                            <h3 className={styles.memberName}>Sofia Ramirez</h3>
                            <p className={styles.memberRole}>Events Coordinator</p>
                        </div>
                    </article>
                    <article className={styles.memberCard}>
                        <div className={styles.memberAvatar}>N</div>
                        <div>
                            <h3 className={styles.memberName}>Noah Smith</h3>
                            <p className={styles.memberRole}>Communications Lead</p>
                        </div>
                    </article>
                    <article className={styles.memberCard}>
                        <div className={styles.memberAvatar}>M</div>
                        <div>
                            <h3 className={styles.memberName}>Maya Ali</h3>
                            <p className={styles.memberRole}>Treasurer</p>
                        </div>
                    </article>
                    <article className={styles.memberCard}>
                        <div className={styles.memberAvatar}>E</div>
                        <div>
                            <h3 className={styles.memberName}>Ethan Brooks</h3>
                            <p className={styles.memberRole}>Secretary</p>
                        </div>
                    </article>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionEyebrow}>
                        <i className="fas fa-envelope" aria-hidden="true"></i>
                        Get In Touch
                    </span>
                    <h2 className={styles.sectionTitle}>Contact Us</h2>
                </div>
                <p className={styles.sectionLead}>
                    Reach out to the council if you have ideas, questions, or want to get involved in upcoming events.
                </p>
                <div className={styles.contactGrid}>
                    <article className={styles.contactItem}>
                        <span className={styles.contactIcon}>
                            <i className="fas fa-envelope" aria-hidden="true"></i>
                        </span>
                        <div>
                            <p className={styles.contactLabel}>Email</p>
                            <a className={styles.contactLink} href="mailto:studentcouncil@williams.ca">
                                studentcouncil@williams.ca
                            </a>
                        </div>
                    </article>
                    <article className={styles.contactItem}>
                        <span className={styles.contactIcon}>
                            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                        </span>
                        <div>
                            <p className={styles.contactLabel}>Office location</p>
                            <p className={styles.contactText}>Student Commons, Dr. G.W. Williams S.S.</p>
                        </div>
                    </article>
                    <article className={styles.contactItem}>
                        <span className={styles.contactIcon}>
                            <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                        </span>
                        <div>
                            <p className={styles.contactLabel}>Meeting hours</p>
                            <p className={styles.contactText}>Wednesdays after school in room 112</p>
                        </div>
                    </article>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <span className={styles.sectionEyebrow}>
                        <i className="fas fa-code" aria-hidden="true"></i>
                        Built By
                    </span>
                    <h2 className={styles.sectionTitle}>Site Credits</h2>
                </div>
                <p className={styles.sectionLead}>
                    This site is designed to highlight Williams STUCO’s mission, events, and student leadership in a clear, accessible format.
                </p>
                <div className={styles.creditsGrid}>
                    <article className={styles.creditCard}>
                        <h3 className={styles.cardTitle}>Williams STUCO Web Team</h3>
                        <p className={styles.cardText}>
                            Built to share council goals, events, and student resources with the Williams community.
                        </p>
                        <span className={styles.creditRole}>Design + Development</span>
                    </article>
                    <article className={styles.creditCard}>
                        <h3 className={styles.cardTitle}>Modern site design</h3>
                        <p className={styles.cardText}>
                            Clean sections, strong typography, and accessible page structure make every section easy to read.
                        </p>
                        <span className={styles.creditRole}>Bold layouts + clear information</span>
                    </article>
                    <article className={styles.creditCard}>
                        <h3 className={styles.cardTitle}>Built with web standards</h3>
                        <p className={styles.cardText}>
                            The site uses shared theme colors and component-based styling for a consistent experience.
                        </p>
                        <span className={styles.creditRole}>Next.js + CSS Modules</span>
                    </article>
                </div>
                <div className={styles.techBadges}>
                    <span className={styles.techLabel}>Built with</span>
                    <div className={styles.badgeRow}>
                        <span className={styles.techBadge}>Next.js</span>
                        <span className={styles.techBadge}>React</span>
                        <span className={styles.techBadge}>CSS Modules</span>
                    </div>
                </div>
            </section>
        </main>
    );
}
