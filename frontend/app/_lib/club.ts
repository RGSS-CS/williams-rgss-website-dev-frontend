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
  const url = getClubsApiUrl();

  if (!url) {
    return [];
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
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
