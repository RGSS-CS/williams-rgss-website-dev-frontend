export type ClubApiRecord = {
  id: number;
  name: string;
  preview_description: string;
  description: string;
  category: string[];
  day_of_meeting: string | null;
  time: string | null;
  repetition: string | null;
  room_num: number | string | null;
  classroom_code: string | null;
  teacher_advisor: string | null;
};

export type Club = {
  id: number;
  name: string;
  preview_description: string;
  description: string;
  categories: string[];
  dayOfMeeting: string | null;
  time: string | null;
  repetition: string | null;
  roomNumber: string | null;
  classroomCode: string | null;
  teacherAdvisor: string | null;
};

function getClubsApiUrl() {
  const apiBaseUrl =
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000";

  return new URL("/club/?format=json", apiBaseUrl).toString();
}

function normalizeClub(record: ClubApiRecord): Club {
  return {
    id: record.id,
    name: record.name,
    preview_description: record.preview_description,
    description: record.description,
    categories: record.category ?? [],
    dayOfMeeting: record.day_of_meeting,
    time: record.time,
    repetition: record.repetition,
    roomNumber: record.room_num === null ? null : String(record.room_num),
    classroomCode: record.classroom_code,
    teacherAdvisor: record.teacher_advisor,
  };
}

export async function getClubs(): Promise<Club[]> {
  const res = await fetch(getClubsApiUrl(), {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to load clubs: ${res.status}`);
  }

  const clubs = (await res.json()) as ClubApiRecord[];
  return clubs.map(normalizeClub);
}

export async function getClubById(id: number): Promise<Club | null> {
  const clubs = await getClubs();
  return clubs.find((club) => club.id === id) ?? null;
}
