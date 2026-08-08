"use server";

export type ClubApiRecord = {
  id: number;
  name: string;
  preview_description: string;
  description: string;
  tagline: string | null;
  category: string[];
  day_of_meeting: string | null;
  time: string | null;
  repetition: string | null;
  room_number: number | string | null;
  classroom_code: string | null;
  teacher_advisor: string | null;
  application_form_link: string;
  accepting_applicants: string;
  join_instructions: string | null;
};

export type Club = {
  id: number;
  name: string;
  preview_description: string;
  description: string;
  tagline: string | null;
  categories: string[];
  dayOfMeeting: string | null;
  time: string | null;
  repetition: string | null;
  roomNumber: string | null;
  classroomCode: string | null;
  teacherAdvisor: string | null;
  applicationFormLink: string;
  acceptingApplicants: string;
  joinInstructions: string | null;
};

function getClubsApiUrl() {
  const apiBaseUrl =
    process.env.API_URL ||
    "http://backend:8000";

  try {
    return new URL("/club/?format=json", apiBaseUrl).toString();
  } catch {
    return null;
  };
};

function formatTimeTo12Hour(time: string | null | undefined): string | null {
  if (!time) {
    return null;
  };

  const trimmedTime = time.trim();
  if (!trimmedTime) {
    return null;
  };

  if (/am|pm/i.test(trimmedTime)) {
    return trimmedTime;
  };

  const match = trimmedTime.match(/^(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?$/);
  if (!match) {
    return trimmedTime;
  };

  const hours = Number(match[1]);
  const minutes = match[2] ? Number(match[2]) : 0;
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalizedHours = hours % 12 === 0 ? 12 : hours % 12;
  const minuteString = minutes.toString().padStart(2, "0");

  return `${normalizedHours}:${minuteString} ${suffix}`;
};

function formatAcceptingApplicants(acceptingApplicants: string): string {
  if (acceptingApplicants === "AC") {
    return "Apply Now";
  } else if (acceptingApplicants === "WA") {
    return "Applications closed";
  }
  return "Open to all";
};

function normalizeClub(record: ClubApiRecord): Club {
  return {
    id: record.id,
    name: record.name,
    preview_description: record.preview_description,
    description: record.description,
    tagline: record.tagline,
    categories: record.category ?? [],
    dayOfMeeting: record.day_of_meeting,
    time: formatTimeTo12Hour(record.time),
    repetition: record.repetition,
    roomNumber: record.room_number === null ? null : String(record.room_number),
    classroomCode: record.classroom_code,
    teacherAdvisor: record.teacher_advisor,
    applicationFormLink: record.application_form_link,
    acceptingApplicants: formatAcceptingApplicants(record.accepting_applicants),
    joinInstructions: record.join_instructions,
  };
};

export async function getClubs(): Promise<Club[]> {
  'use cache: private';
  const url = getClubsApiUrl();
  if (!url) {
    return [];
  };

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return [];
    };

    const clubs = (await res.json()) as ClubApiRecord[];
    return clubs.map(normalizeClub);
  } catch {
    return [];
  };
};

export async function getClubById(id: number): Promise<Club | null> {
  const clubs = await getClubs();
  return clubs.find((club) => club.id === id) ?? null;
};
