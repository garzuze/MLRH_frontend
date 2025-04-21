import { FiTrendingDown, FiTrendingUp } from "react-icons/fi"
import { useProfiles } from "../../hooks/useProfiles"
import { useAccountsReceivableTitle } from "../../hooks/useAccountsReceivableTitle";

export default function StatCards() {

    const { data: profiles } = useProfiles();
    const { data: receivableTitles } = useAccountsReceivableTitle();
    const invoiced = receivableTitles?.reduce((acc, title) => acc + Number(title.amount), 0);

    return <>
        <Card title="Total faturado" value={`R$ ${String(invoiced)}`} pillText="5.27%" trend="up" period="Total" />
        <Card title="Vagas fechadas" value={String(profiles?.filter((p) => p.status == "F").length)} pillText="17,7%" trend="up" period="De 1º de Jan até 18 de Fev" />
        <Card title="Clientes novos" value="7" pillText="5%" trend="down" period="Total" />
    </>
}

interface CardTypes {
    title: string,
    value: string,
    pillText: string,
    trend: "up" | "down",
    period: string
}

const Card = ({
    title,
    value,
    pillText,
    trend,
    period
}: CardTypes) => {
    return (
        <div className="col-span-4 p-4 rounded border border-stone-300">
            <div className="flex mb-8 items-start justify-between">
                <div>
                    <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
                    <p className="text-3xl font-semibold">{value}</p>
                </div>
                <p className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}>
                    {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
                    {pillText}
                </p>
            </div>
            <p className="text-xs text-stone-500">
                {period}
            </p>
        </div>
    )
}