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
};

function getClubsApiUrl() {
  const apiBaseUrl =
    process.env.API_URL ||
    "http://backend:8000";
    
  try {
    return new URL("/club/?format=json", apiBaseUrl).toString();
  } catch {
    return null;
  }
}

function normalizeClub(record: ClubApiRecord): Club {
  return {
    id: record.id,
    name: record.name,
    preview_description: record.preview_description,
    description: record.description,
    tagline: record.tagline,
    categories: record.category ?? [],
    dayOfMeeting: record.day_of_meeting,
    time: record.time,
    repetition: record.repetition,
    roomNumber: record.room_number === null ? null : String(record.room_number),
    classroomCode: record.classroom_code,
    teacherAdvisor: record.teacher_advisor,
    applicationFormLink: record.application_form_link,
  };
}

export async function getClubs(): Promise<Club[]> {
  const url = getClubsApiUrl();

  if (!url) {
    return [];
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return [];
    }

    const clubs = (await res.json()) as ClubApiRecord[];
    return clubs.map(normalizeClub);
  } catch {
    return [];
  }
}

export async function getClubById(id: number): Promise<Club | null> {
  const clubs = await getClubs();
  return clubs.find((club) => club.id === id) ?? null;
}
