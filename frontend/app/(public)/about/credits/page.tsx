import styles from "./credits.module.css";

export default function Credits() {
  return (
    <section className={styles.sectionWrap}>
      <div className={styles.sectionContent}>
        <div className={styles.sectionTitleRow}>
          <h2 className={styles.sectionTitle}>Site Credits</h2>
        </div>
        <p className={styles.sectionLead}>
          This website was designed and developed by students under the <strong>RGSS-CS</strong>{" "}
          GitHub organization in collaboration with students from{" "}
          <strong>Dr. G.W Williams S.S</strong>.
        </p>
        <p>
          Want to contribute?{" "}
          <a
            className={styles.contactLink}
            href='https://github.com/RGSS-CS'
            target='_blank'
            rel='noopener noreferrer'
          >
            Open a PR on GitHub.
          </a>
        </p>

        <div className={styles.teamGrid}>
          <article className={styles.projectManagerCard}>
            <h3 className={styles.cardTitle}>Project Managers</h3>
            <div className={styles.roleList}>
              <div className={styles.roleRow}>
                <b className={styles.projectManagerName}>
                  <a
                    className={styles.personLink}
                    href='https://github.com/jerrf010'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Aiden So
                  </a>
                </b>
              </div>
            </div>
          </article>

          <article className={styles.creditCard}>
            <h3 className={styles.cardTitle}>Frontend Team</h3>
            <div className={styles.roleList}>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Main Engineers / Programmers</span>
                <p className={styles.cardText}>
                  <a
                    className={styles.personLink}
                    href='https://github.com/jerrf010'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Aiden So
                  </a>
                </p>
              </div>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Reviewers</span>
                <p className={styles.cardText}>
                  <a
                    className={styles.personLink}
                    href='https://github.com/jerrf010'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Aiden So
                  </a>
                  ,{" "}
                  <a
                    className={styles.personLink}
                    href='https://github.com/DanPlus6'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    David Fu
                  </a>
                  ,{" "}
                  <a
                    className={styles.personLink}
                    href='https://github.com/zhubenjamin'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Benjamin Zhu
                  </a>
                </p>
              </div>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Design Lead</span>
                <p className={styles.cardText}>
                  <a
                    className={styles.personLink}
                    href='mailto:isa.he10@outlook.com'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Isabella He
                  </a>
                </p>
              </div>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Other Designers</span>
                <p className={styles.smallText}>
                  <a
                    className={styles.personLink}
                    href='https://github.com/DanPlus6'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    David Fu
                  </a>
                  ,{" "}
                  <a
                    className={styles.personLink}
                    href='https://github.com/kztg2021-jpg'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Kyle Gu
                  </a>
                  ,{" "}
                  <a
                    className={styles.personLink}
                    href='https://github.com/saltedfork3'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Aaron Wang
                  </a>
                </p>
              </div>
            </div>
          </article>

          <article className={styles.creditCard}>
            <h3 className={styles.cardTitle}>Backend Team</h3>
            <div className={styles.roleList}>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Main Engineers / Programmers</span>
                <p className={styles.cardText}>
                  <a
                    className={styles.personLink}
                    href='https://github.com/zhubenjamin'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Benjamin Zhu
                  </a>
                  ,{" "}
                  <a
                    className={styles.personLink}
                    href='https://github.com/jerrf010'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Aiden So
                  </a>
                </p>
              </div>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Reviewers</span>
                <p className={styles.cardText}>
                  <a
                    className={styles.personLink}
                    href='https://github.com/jerrf010'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Aiden So
                  </a>
                  ,{" "}
                  <a
                    className={styles.personLink}
                    href='https://github.com/zhubenjamin'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Benjamin Zhu
                  </a>
                  ,{" "}
                  <a
                    className={styles.personLink}
                    href='https://github.com/DanPlus6'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    David Fu
                  </a>
                </p>
              </div>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Other Contributors</span>
                <p className={styles.smallText}>
                  <a
                    className={styles.personLink}
                    href='https://github.com/C1ear61ade'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Ryan Shi
                  </a>
                </p>
              </div>
            </div>
          </article>
          <article className={styles.creditCard}>
            <h3 className={styles.cardTitle}>QA Testers</h3>
            <div className={styles.roleList}>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Quality Assurance</span>
                <p className={styles.cardText}>
                  <a
                    className={styles.personLink}
                    href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Name Here
                  </a>
                </p>
              </div>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Quality Assurance</span>
                <p className={styles.cardText}>
                  <a
                    className={styles.personLink}
                    href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Name Here
                  </a>
                </p>
              </div>
              <div className={styles.roleRow}>
                <span className={styles.creditRole}>Quality Assurance</span>
                <p className={styles.cardText}>
                  <a
                    className={styles.personLink}
                    href=''
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Name Here
                  </a>
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className={styles.techBadges}>
          <span className={styles.techLabel}>Built with</span>
          <div className={styles.badgeRow}>
            <a
              className={styles.techBadge}
              href='https://nextjs.org/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Next.js
            </a>
            <a
              className={styles.techBadge}
              href='https://www.djangoproject.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Django
            </a>
            <a
              className={styles.techBadge}
              href='https://fonts.google.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Google Fonts
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
