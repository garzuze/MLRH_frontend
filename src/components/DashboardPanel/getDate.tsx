export default function getDate() {
    const daysWeek: Record<number, string> = {
        0: "Domingo",
        1: "Segunda-feira",
        2: "Terça-feira",
        3: "Quarta-feira",
        4: "Quinta-feira",
        5: "Sexta-feira",
        6: "Segunda-feira",
    }

    const months: Record<number, string> = {
        0: "Janeiro",
        1: "Fevereiro",
        2: "Março",
        3: "Abril",
        4: "Maio",
        5: "Junho",
        6: "Julho",
        7: "Agosto",
        8: "Setembro",
        9: "Outubro",
        10: "Novembro",
        11: "Dezembro",
    }

    const today = new Date();
    const dayMonth = today.getDate();
    const dayWeek = today.getDay();
    const year = today.getFullYear();
    const month = today.getMonth();

    return `${daysWeek[dayWeek]}, ${dayMonth} de ${months[month]} de ${year}`
}