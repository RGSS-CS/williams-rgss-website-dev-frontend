import Link from "next/link";
import { notFound } from "next/navigation";

import { getClubById, getClubs } from "@/app/_lib/club";

import styles from "./club-detail.module.css";

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

export async function generateStaticParams() {
  const clubs = await getClubs();
  return clubs.map((club) => ({ id: String(club.id) }));
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

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/clubs">Clubs</Link>
            <span>/</span>
            <span>{club.name}</span>
          </div>

          <h1 className={styles.title}>{club.name}</h1>
          <p className={styles.tagline}>{club.preview_description}</p>

          <div className={styles.heroStats}>
            <div>
              <span className={styles.heroStatNumber}>{club.categories.length || 1}</span>
              <span className={styles.heroStatLabel}>Categories</span>
            </div>
            <div>
              <span className={styles.heroStatNumber}>{meetingDay.split(" ")[0]}</span>
              <span className={styles.heroStatLabel}>Meeting Day</span>
            </div>
            <div>
              <span className={styles.heroStatNumber}>{club.roomNumber ?? "TBA"}</span>
              <span className={styles.heroStatLabel}>Room</span>
            </div>
            <div>
              <span className={styles.heroStatNumber}>{cadence}</span>
              <span className={styles.heroStatLabel}>Schedule</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.aboutWrap}>
        <section className={styles.section}>
          <div className={styles.aboutGrid}>
            <div>
              <span className={styles.sectionEyebrow}>About</span>
              <h2 className={styles.sectionTitle}>{club.name}</h2>
              <div className={styles.sectionBody}>{club.preview_description}</div>

              <div className={styles.badgeRow}>
                <div className={styles.badge}>
                  <i className="fas fa-calendar-check"></i>
                  {meetingDay} · {meetingTime}
                </div>
                <div className={styles.badge}>
                  <i className="fas fa-door-open"></i>
                  {roomLabel}
                </div>
                <div className={styles.badge}>
                  <i className="fas fa-layer-group"></i>
                  {club.categories.join(" · ")}
                </div>
              </div>
            </div>

            <div className={styles.aboutVisual}>
              <div className={styles.aboutVisualCaption}>
                <strong>{club.name}</strong>
                <div>{primaryCategory}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.infoWrap}>
        <section className={styles.section}>
          <div className={styles.headlineRow}>
            <i className="fas fa-info-circle"></i>
            <span>Club Information</span>
          </div>

          <div className={styles.infoGrid}>
            <article className={styles.infoTile}>
              <i className="fas fa-layer-group"></i>
              <h3>Category</h3>
              <p>{club.categories.join(", ") || "Not provided"}</p>
            </article>
            <article className={styles.infoTile}>
              <i className="fas fa-calendar-alt"></i>
              <h3>Meeting Day</h3>
              <p>{meetingDay}</p>
            </article>
            <article className={styles.infoTile}>
              <i className="fas fa-clock"></i>
              <h3>Meeting Time</h3>
              <p>{meetingTime}</p>
            </article>
            <article className={styles.infoTile}>
              <i className="fas fa-repeat"></i>
              <h3>Repetition</h3>
              <p>{cadence}</p>
            </article>
            <article className={styles.infoTile}>
              <i className="fas fa-door-open"></i>
              <h3>Room</h3>
              <p>{roomLabel}</p>
            </article>
            <article className={styles.infoTile}>
              <i className="fas fa-user-tie"></i>
              <h3>Teacher Advisor</h3>
              <p>{club.teacherAdvisor ?? "Not provided"}</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
