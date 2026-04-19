export function getSchoolYear(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    if (month >= 8) {
        return `${year}-${year + 1}`;
    } else {
        return `${year - 1}-${year}`;
    }
}
