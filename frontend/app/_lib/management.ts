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
  school_email: string;
  school_phone: string;
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
  schoolName: string | null;
  councilName: string | null;
  schoolEmail: string | null;
  schoolPhone: string | null;
  socialMedia: unknown[] | null;
  favicon: string | null;
  stucoImage: string | null;
  aboutStuco: string | null;
  aboutSchool: string | null;
  schoolLocation: SchoolLocation[] | null;
  schoolMascot: string | null;
  schoolPrimaryColor: string | null;
  schoolSecondaryColor: string | null;
  schoolTertiaryColor: string | null;
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
    schoolName: record.school_name ?? null,
    councilName: record.council_name ?? null,
    schoolEmail: record.school_email ?? null,
    schoolPhone: record.school_phone ?? null,
    socialMedia: record.social_media ?? null,
    favicon: record.favicon ?? null,
    stucoImage: record.stuco_image ?? null,
    aboutStuco: record.about_stuco ?? null,
    aboutSchool: record.about_school ?? null,
    schoolLocation: record.school_location ? record.school_location.map(normalizeSchoolLocation) : null,
    schoolMascot: record.school_mascot ?? null,
    schoolPrimaryColor: record.school_primary_color ?? null,
    schoolSecondaryColor: record.school_secondary_color ?? null,
    schoolTertiaryColor: record.school_tertiary_color ?? null,
  };
}

export async function getManagement(): Promise<Management[]> {
  const url = getManagementApiUrl();

  if (!url) {
    console.error("getManagement: could not build API URL (check API_URL env var)");
    return [];
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
        tags: ["management"],
      }
    });

    if (!res.ok) {
      console.error(`getManagement: backend responded with ${res.status} ${res.statusText} for ${url}`);
      return [];
    }

    const management = (await res.json()) as ManagementApiRecord[];
    return management.map(normalizeManagement);
  } catch (err) {
    console.error(`getManagement: fetch to ${url} failed:`, err);
    return [];
  }
}

export async function getManagementSettings(): Promise<Management | null> {
  const management = await getManagement();
  return management[0] ?? null;
}