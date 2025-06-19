import { FiTrendingDown, FiTrendingUp } from "react-icons/fi"
import { useProfiles } from "../../hooks/useProfiles"
import { useReceivableTitle } from "../../hooks/useReceivableTitle";

export default function StatCards() {

    const { data: profiles, isLoading: isProfileLoading } = useProfiles();
    const { data: receivableTitles, isLoading: isLoadingReceivableTitles } = useReceivableTitle();
    const invoiced = Number(receivableTitles?.reduce((acc, title) => acc + Number(title.amount), 0));
    const sold = Number(profiles?.reduce((acc, profile) => acc + profile.quantity * ((profile.remuneration * profile.serviceFee) / 100), 0))
    const openProfiles = Number(profiles?.filter(f => f.status == "A").reduce((acc, profile) => acc + profile.quantity * ((profile.remuneration * profile.serviceFee) / 100), 0))

    return <>
        <Card title="Vendas" value={isProfileLoading ? "Carregando" : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sold)} pillText="-%" trend="up" period="Total" />
        <Card title="Total faturado" value={isLoadingReceivableTitles ? "Carregando..." : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(invoiced)} pillText="-%" trend="up" period="Total" />
        <Card title="Vagas abertas" value={isLoadingReceivableTitles ? "Carregando..." : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(openProfiles)} pillText="-%" trend="up" period="De 1º de Jan até 18 de Fev" />
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