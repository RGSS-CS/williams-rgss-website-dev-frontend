import Link from "next/link";
import { notFound } from "next/navigation";

import { getClubById } from "@/app/_lib/club";

import styles_modules from "./club-detail.module.css";
import styles from "@/app/(public)/(global_pages)/clubs/clubs.module.css";
import AnchorLink from "@/app/(public)/_components/AnchorLink";

type ClubPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatTime(time: string | null) {
  if (!time) {
    return "Time TBA";
  }

  const [hour, minute] = time.split(":");
  const parsedHour = Number(hour);
  const parsedMinute = Number(minute);

  if (Number.isNaN(parsedHour) || Number.isNaN(parsedMinute)) {
    return time;
  }

  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(2000, 0, 1, parsedHour, parsedMinute));
}

function formatDay(day: string | null) {
  if (!day) {
    return "Meeting day TBA";
  }

  const normalized = day.toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function sentenceCase(value: string | null, fallback: string) {
  if (!value) {
    return fallback;
  }

  const normalized = value.toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export default async function ClubDetailPage({ params }: ClubPageProps) {
  const { id } = await params;
  const clubId = Number(id);

  if (Number.isNaN(clubId)) {
    notFound();
  }

  const club = await getClubById(clubId);

  if (!club) {
    notFound();
  }

  const primaryCategory = club.categories[0] ?? "Student Club";
  const meetingDay = formatDay(club.dayOfMeeting);
  const meetingTime = formatTime(club.time);
  const roomLabel = club.roomNumber ? `Room ${club.roomNumber}` : "Location TBA";
  const cadence = sentenceCase(club.repetition, "Schedule to be announced");
  const classcode = club.classroomCode ?? "Not provided";
  const demoClassroomInviteUrl = "https://classroom.google.com/c/NzAwMDAwMDAwMDAw?cjc=demo123";

  return (
    <main>
      <section className="hero">
        <div className="hero_shape"></div>
        <div className="heroInner">
          <div className="hero_left">
            <div className={styles_modules.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/clubs">Clubs</Link>
              <span>/</span>
              <span>{club.name}</span>
            </div>
            <div className={`hero_title ${styles_modules.hero_title}`}>
              <h1>{club.name}</h1>
            </div>
            <div className="hero_subtitle">
              <p>{club.preview_description}</p>
            </div>
            <div className={styles_modules.heroActions}>
              <AnchorLink className={styles_modules.heroJoinButton} href="#join-club">
                Apply Now
              </AnchorLink>
              <p><i className="fas fa-chevron-down"></i>Scroll to explore</p>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className="stat-num">{club.categories.length || 1}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className={styles.heroStat}>
                <span className="stat-num">{meetingDay.split(" ")[0]}</span>
                <span className="stat-label">Meeting Day</span>
              </div>
              <div className={styles.heroStat}>
                <span className="stat-num">{club.roomNumber ?? "TBA"}</span>
                <span className="stat-label">Room</span>
              </div>
              <div className={styles.heroStat}>
                <span className="stat-num">{cadence}</span>
                <span className="stat-label">Schedule</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles_modules.aboutWrap}>
        <section className={styles_modules.section}>
          <div className={styles_modules.aboutGrid}>
            <div>
              <span className={styles_modules.sectionEyebrow}>About Us</span>
              <h2 className={styles_modules.sectionTitle}>{club.name}</h2> {/*replace with club tagline */}
              <div className={styles_modules.sectionBody}>{club.preview_description}</div>

              <div className={styles_modules.badgeRow}>
                <div className={styles_modules.badge}>
                  <i className="fas fa-calendar-check"></i>
                  {meetingDay} · {meetingTime}
                </div>
                <div className={styles_modules.badge}>
                  <i className="fas fa-door-open"></i>
                  {roomLabel}
                </div>
                <div className={styles_modules.badge}>
                  <i className="fas fa-layer-group"></i>
                  {club.categories.join(" · ")}
                </div>
              </div>
            </div>

            <div className={styles_modules.aboutVisual}>
              <div className={styles_modules.aboutVisualCaption}>
                <strong>{club.name}</strong>
                <div>{primaryCategory}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={`${styles_modules.divider} category-divider`}></div>
      <div className={styles_modules.infoWrap}>
        <section className={styles_modules.section}>
          <div className={styles_modules.headlineRow}>
            <i className="fas fa-info-circle"></i>
            <span>Club Information</span>
          </div>

          <div className={styles_modules.infoGrid}>
            <article className={styles_modules.infoTile}>
              <i className="fas fa-layer-group"></i>
              <h3>Category</h3>
              <p>{club.categories.join(", ") || "Not provided"}</p>
            </article>
            <article className={styles_modules.infoTile}>
              <i className="fas fa-calendar-alt"></i>
              <h3>Meeting Day</h3>
              <p>{meetingDay}</p>
            </article>
            <article className={styles_modules.infoTile}>
              <i className="fas fa-clock"></i>
              <h3>Meeting Time</h3>
              <p>{meetingTime}</p>
            </article>
            <article className={styles_modules.infoTile}>
              <i className="fas fa-repeat"></i>
              <h3>Repetition</h3>
              <p>{cadence}</p>
            </article>
            <article className={styles_modules.infoTile}>
              <i className="fas fa-door-open"></i>
              <h3>Room</h3>
              <p>{roomLabel}</p>
            </article>
            <article className={styles_modules.infoTile}>
              <i className="fas fa-user-tie"></i>
              <h3>Teacher Advisor</h3>
              <p>{club.teacherAdvisor ?? "Not provided"}</p>
            </article>
          </div>
        </section>
      </div>

      <section
        className={styles_modules.applySection}
        id="join-club"
        aria-labelledby="join-club-heading"
      >
        <div className={styles_modules.applySectionShell}>
          <div className={styles_modules.applySectionCopy}>
            <span className={styles_modules.applyPanelEyebrow}>Ready to join?</span>
            <h2 id="join-club-heading">Join the Club</h2>
            <p>
              Grab the meeting details, then hop into Google Classroom to follow updates and announcements.
            </p>
          </div>

          <div className={styles_modules.applyPanel}>
            <div className={styles_modules.applyPanelInner}>
              <div className={styles_modules.applyInfoCard}>
                <div className={styles_modules.applyInfoRow}>
                  <i className="fas fa-calendar-alt"></i>
                  <p>
                    <strong>Meetings</strong>
                    {meetingDay} at {meetingTime}
                  </p>
                </div>
                <div className={styles_modules.applyInfoRow}>
                  <i className="fas fa-door-open"></i>
                  <p>
                    <strong>Location</strong>
                    {roomLabel}
                  </p>
                </div>
              </div>

              <div className={styles_modules.applyCodeCard}>
                <span>Google Classroom Code</span>
                <div className={styles_modules.applyCodeRow}>
                  <span className={styles_modules.applyCodeBadge}>{classcode}</span>
                </div>
              </div>

              <a
                className={styles_modules.applyInviteLink}
                href={demoClassroomInviteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open Classroom Invite
                <i className="fas fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
