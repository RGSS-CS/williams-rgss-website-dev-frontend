"use client";

export function getSchoolYear(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
 
    const startYear = month >= 8 ? year : year - 1;
    const endYear = startYear + 1;
 
    return `${startYear}-${endYear}`;
}
 