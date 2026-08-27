export async function getSchoolYear() {
    "use cache";
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const schoolYear = month >= 8 ? `${year}-${year + 1}` : `${year - 1}-${year}`;

    return schoolYear;
}
