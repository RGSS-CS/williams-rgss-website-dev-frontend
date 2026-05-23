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

function splitDescription(description: string) {
  const normalized = description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const intro = normalized[0] ?? "A student-led space to learn, build, and connect.";
  const details = normalized.slice(1).join("\n");

  return {
    intro,
    details: details || description,
  };
}

function buildActivities(name: string, category: string, day: string | null) {
  return [
    {
      icon: "fas fa-vial",
      title: "Hands-On Sessions",
      text: `${name} focuses on practical sessions where students learn by doing, testing ideas, and building confidence together.`,
      note: day ? `Usually meets on ${formatDay(day)}` : "Weekly club rhythm",
    },
    {
      icon: "fas fa-users",
      title: "Community & Collaboration",
      text: `Members work together in a supportive ${category.toLowerCase()} environment where curiosity, teamwork, and student leadership matter.`,
      note: "Open to interested students",
    },
    {
      icon: "fas fa-trophy",
      title: "Events & Opportunities",
      text: `The club can host projects, showcases, competitions, and special events that help students turn interest into real experience.`,
      note: "Built around student involvement",
    },
  ];
}

function buildBenefits(category: string) {
  return [
    {
      icon: "fas fa-chart-line",
      title: "Build Real Skills",
      text: `Develop practical ${category.toLowerCase()} skills, confidence, and teamwork through consistent involvement.`,
    },
    {
      icon: "fas fa-user-friends",
      title: "Find Your People",
      text: "Meet students with similar interests and grow inside a welcoming school community.",
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Strengthen Applications",
      text: "Club participation helps demonstrate initiative, leadership, and long-term commitment.",
    },
    {
      icon: "fas fa-star",
      title: "Get Involved",
      text: "Take part in school life through projects, events, and visible contributions beyond class time.",
    },
  ];
}

const photoLabels = [
  "Club Meeting",
  "Student Project",
  "Team Collaboration",
  "Event Day",
  "Showcase Moment",
  "Community Building",
];

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
  const { intro, details } = splitDescription(club.description);
  const activities = buildActivities(club.name, primaryCategory, club.dayOfMeeting);
  const benefits = buildBenefits(primaryCategory);
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

          <div className={styles.eyebrow}>
            <i className="fas fa-flask"></i>
            {primaryCategory} Club
          </div>

          <h1 className={styles.title}>
            {club.name} <span className={styles.titleAccent}>Club</span>
          </h1>

          <p className={styles.tagline}>{intro}</p>

          <div className={styles.heroActions}>
            <a href="#about" className={styles.heroButton}>
              <i className="fas fa-compass"></i>
              Explore This Club
            </a>
            <span className={styles.heroHint}>
              Scroll to see meeting info, highlights, and how to get involved.
            </span>
          </div>

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

      <div className={styles.applyRail}>
        <div className={styles.applyCard}>
          <div className={styles.applyTab}>Apply</div>
          <div className={styles.applyBody}>
            <div className={styles.applyTitle}>
              <i className="fas fa-paper-plane"></i> Join the Club
            </div>
            <div className={styles.applyList}>
              <div className={styles.applyItem}>
                <i className="fas fa-calendar-alt"></i>
                <div>
                  <strong>{meetingDay}</strong>
                  <span>{meetingTime}</span>
                </div>
              </div>
              <div className={styles.applyItem}>
                <i className="fas fa-door-open"></i>
                <div>
                  <strong>{roomLabel}</strong>
                  <span>{cadence}</span>
                </div>
              </div>
              <div className={styles.applyItem}>
                <i className="fas fa-chalkboard"></i>
                <div>
                  <strong>Classroom details</strong>
                  <span>Available after sign-in</span>
                </div>
              </div>
              <div className={styles.applyItem}>
                <i className="fas fa-user-tie"></i>
                <div>
                  <strong>{club.teacherAdvisor ?? "Advisor TBA"}</strong>
                  <span>Teacher advisor</span>
                </div>
              </div>
            </div>
            <Link href="/private/authentication" className={styles.applyButton}>
              <i className="fas fa-arrow-right-to-bracket"></i>
              Sign In For Join Details
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.aboutWrap} id="about">
        <section className={styles.section}>
          <div className={styles.aboutGrid}>
            <div>
              <span className={styles.sectionEyebrow}>About Us</span>
              <h2 className={styles.sectionTitle}>A place to explore, learn, and contribute</h2>
              <div className={styles.sectionBody}>{details}</div>

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

              <div className={styles.quote}>
                <i className="fas fa-quote-left"></i> Student-led experiences grow when curiosity,
                consistency, and community come together.
              </div>
            </div>

            <div className={styles.aboutVisual}>
              <div className={styles.aboutVisualCaption}>
                <strong>{club.name}</strong>
                <div>{primaryCategory} at Dr. G.W. Williams S.S.</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.scienceWrap}>
        <section className={styles.section}>
          <div className={styles.headlineRow}>
            <i className="fas fa-atom"></i>
            <span>What We Do</span>
          </div>

          <div className={styles.cardsGrid}>
            {activities.map((activity) => (
              <article className={styles.featureCard} key={activity.title}>
                <div className={styles.featureMedia}></div>
                <div className={styles.featureBody}>
                  <div className={styles.featureIcon}>
                    <i className={activity.icon}></i>
                  </div>
                  <h3 className={styles.featureTitle}>{activity.title}</h3>
                  <p className={styles.featureText}>{activity.text}</p>
                  <div className={styles.featureNote}>
                    <i className="far fa-clock"></i>
                    {activity.note}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.benefitsWrap}>
        <section className={styles.section}>
          <div className={styles.headlineRow}>
            <i className="fas fa-star"></i>
            <span>Why Join?</span>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit) => (
              <article className={styles.benefitCard} key={benefit.title}>
                <i className={benefit.icon}></i>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.photosWrap}>
        <section className={styles.section}>
          <div className={styles.headlineRow}>
            <i className="fas fa-images"></i>
            <span>Club In Action</span>
          </div>

          <div className={styles.photosGrid}>
            {photoLabels.map((label) => (
              <div className={styles.photoTile} key={label}>
                <div className={styles.photoLabel}>{label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className={`${styles.infoWrap} ${styles.hiddenDesktop}`}>
        <div className={styles.infoCards}>
          <article className={styles.infoCard}>
            <h3>
              <i className="fas fa-paper-plane"></i>
              Join This Club
            </h3>
            <p>
              Meeting information is public, but classroom join details stay protected.
              Sign in to view student-only access information for {club.name}.
            </p>
            <Link href="/private/authentication" className={styles.applyButton}>
              <i className="fas fa-arrow-right-to-bracket"></i>
              Sign In
            </Link>
          </article>

          <article className={styles.infoCard}>
            <h3>
              <i className="fas fa-user-tie"></i>
              Advisor Support
            </h3>
            <p>
              {club.teacherAdvisor
                ? `${club.teacherAdvisor} helps support the club and keep meetings running smoothly.`
                : "Teacher advisor details will be shared when confirmed."}
            </p>
          </article>
        </div>
      </div>

      <div className={styles.infoWrap}>
        <div className={styles.infoCards}>
          <article className={styles.infoCard}>
            <h3>
              <i className="fas fa-bullhorn"></i>
              Club Update
            </h3>
            <p>
              {club.name} is part of the Williams student activities directory. Check back here
              for future updates, event spotlights, and meeting reminders as more club-specific
              content is added.
            </p>
          </article>

          <article className={styles.infoCard}>
            <h3>
              <i className="fas fa-user-tie"></i>
              Message From The Team
            </h3>
            <p>
              Whether you&apos;re brand new or already interested in {primaryCategory.toLowerCase()},
              this club is meant to help students participate, contribute, and find a place to
              grow inside the school community.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
