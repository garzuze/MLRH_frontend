import { FiTrendingDown, FiTrendingUp } from "react-icons/fi"

export default function StatCards() {
    return <>
        <Card title="Total em vendas" value="R$20,512" pillText="5.27%" trend="up" period="De 1º de Jan até 2 de Fev" />
        <Card title="Vagas fechadas" value="53" pillText="17,7%" trend="up" period="De 1º de Jan até 18 de Fev" />
        <Card title="Clientes novos" value="7" pillText="5%" trend="down" period="De 1º de Jan até 2 de Fev" />
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

                <span className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${trend === "up"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
                    {pillText}
                </span>
            </div>
            <p className="text-xs text-stone-500">
                {period}
            </p>
        </div>
    )
}