export const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
        return "-";
    }
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) {
        return "-";
    }
    return `${day}/${month}/${year}`;
};