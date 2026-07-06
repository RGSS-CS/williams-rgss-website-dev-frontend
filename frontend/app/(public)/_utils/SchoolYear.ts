export async function getSchoolYear() {
    "use cache";
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    if (month >= 8) {
        var school_year = `${year}-${year + 1}`;
    } else {
        var school_year = `${year - 1}-${year}`;
    }

    return (school_year);
}
