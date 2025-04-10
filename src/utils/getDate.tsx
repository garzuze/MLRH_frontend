export default function getDate() {
    const today = new Date();
    const dayMonth = today.getDate();
    const year = today.getFullYear();
    const month = today.getMonth();

    return `${dayMonth < 10 ? `0${dayMonth}` : String(dayMonth)}/${month < 10 ? `0${month + 1}` : String(month + 1)}/${year}`
}
