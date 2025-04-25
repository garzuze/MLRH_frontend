import { title } from "process";
import { useState } from "react";
import { IconType } from "react-icons";
import { FiHome, FiDollarSign, FiUsers, FiBriefcase } from "react-icons/fi"
import { NavLink } from "react-router-dom";

export default function RouteSelect() {
    const routes = [
        { icon: FiHome, title: "Dashboard", destination: "dashboard/" },
        { icon: FiBriefcase, title: "Vendas", destination: "vendas/" },
        { icon: FiUsers, title: "Seleção", destination: "selecao/" },
        { icon: FiDollarSign, title: "Financeiro", destination: "financeiro/" },
        {icon: FiDollarSign, title: "PDF de currículo", destination: "curriculos"}
    ]

    return (
        <div className="space-y-1">
            {routes.map((route) => {
                return <Route Icon={route.icon} title={route.title} destination={route.destination} key={route.destination} />;
            })}
        </div>
    )
}

interface RouteTypes {
    Icon: IconType;
    title: string;
    destination: string;
}

const Route = ({ Icon, title, destination, }: RouteTypes) => {

    return <NavLink to={destination} className={({ isActive }) => `flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadhow,_background-color,_color] ${isActive
        ? "bg-white text-stone-950 shadow"
        : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"}`}>
        {({ isActive }) => (
            <>
                <Icon className={isActive ? "text-violet-500" : ""} />
                <p>{title}</p>
            </>
        )}
    </NavLink>
}