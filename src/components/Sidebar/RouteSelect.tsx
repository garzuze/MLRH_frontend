import { IconType } from "react-icons";
import {FiHome, FiDollarSign, FiUsers, FiBriefcase } from "react-icons/fi"

export default function RouteSelect() {
    return (
        <div className="space-y-1">
            <Route Icon={FiHome} selected={true} title="Dashboard" />
            <Route Icon={FiBriefcase} title="Vendas" selected={false} />
            <Route Icon={FiUsers} title="Seleção" selected={false} />
            <Route Icon={FiDollarSign} title="Financeiro" selected={false} />
        </div>
    )
}

const Route = ({ selected, Icon, title }: { selected: boolean; Icon: IconType; title: string}) => {
    return <button className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadhow,_background-color,_color] ${
        selected
        ? "bg-white text-stone-950 shadow"
        : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
    }`}>
        <Icon className={selected ? "text-violet-500" : ""} />
        <span>{title}</span>
    </button>
}