export type SchoolLocationApiRecord = {
  location: string;
  location_lat: number;
  location_lon: number;
  content_type: number;
  object_id: number;
};

export type SchoolLocation = {
  location: string;
  locationLat: number;
  locationLon: number;
  contentType: number;
  objectId: number;
};

export type ManagementApiRecord = {
  maintainance_mode: boolean;
  school_name: string;
  council_name: string;
  social_media: unknown[];
  favicon: string;
  stuco_image: string;
  about_stuco: string;
  about_school: string;
  school_location: SchoolLocationApiRecord[];
  school_mascot: string;
  school_primary_color: string;
  school_secondary_color: string;
  school_tertiary_color: string;
};

export type Management = {
  maintainanceMode: boolean;
  schoolName: string;
  councilName: string;
  socialMedia: unknown[];
  favicon: string;
  stucoImage: string;
  aboutStuco: string;
  aboutSchool: string;
  schoolLocation: SchoolLocation[];
  schoolMascot: string;
  schoolPrimaryColor: string;
  schoolSecondaryColor: string;
  schoolTertiaryColor: string;
};

function getManagementApiUrl() {
  const apiBaseUrl =
    process.env.API_URL ||
    "http://backend:8000";

  try {
    return new URL("/management/?format=json", apiBaseUrl).toString();
  } catch {
    return null;
  }
}

function normalizeSchoolLocation(record: SchoolLocationApiRecord): SchoolLocation {
  return {
    location: record.location,
    locationLat: record.location_lat,
    locationLon: record.location_lon,
    contentType: record.content_type,
    objectId: record.object_id,
  };
}

function normalizeManagement(record: ManagementApiRecord): Management {
  return {
    maintainanceMode: record.maintainance_mode,
    schoolName: record.school_name,
    councilName: record.council_name,
    socialMedia: record.social_media ?? [],
    favicon: record.favicon,
    stucoImage: record.stuco_image,
    aboutStuco: record.about_stuco,
    aboutSchool: record.about_school,
    schoolLocation: (record.school_location ?? []).map(normalizeSchoolLocation),
    schoolMascot: record.school_mascot,
    schoolPrimaryColor: record.school_primary_color,
    schoolSecondaryColor: record.school_secondary_color,
    schoolTertiaryColor: record.school_tertiary_color,
  };
}

export async function getManagement(): Promise<Management[]> {
  "use cache: private";
  const url = getManagementApiUrl();

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

    const management = (await res.json()) as ManagementApiRecord[];
    return management.map(normalizeManagement);
  } catch {
    return [];
  }
}

export async function getManagementSettings(): Promise<Management | null> {
  const management = await getManagement();
  return management[0] ?? null;
}