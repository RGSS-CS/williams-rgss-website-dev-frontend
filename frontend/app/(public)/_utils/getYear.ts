export default async function getYear() {
    "use cache";
    const currentYear = new Date().getFullYear();
    return currentYear;
}