import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar";
import { FiChevronLeft } from "react-icons/fi";
import { useState } from "react";

export default function AdminPanel() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    return (
        <main className={`${collapsed ? `w-full`: `grid gap-4 p-4 grid-cols-[220px,_1fr]`} bg-stone-100 text-stone-950 font-roboto`}>
            {!collapsed ? <Sidebar /> : null}
            <FiChevronLeft className={`absolute top-[50%] cursor-pointer ${collapsed ? `rotate-180` : null}`} onClick={() => setCollapsed(!collapsed)}/>
            <Outlet />
        </main>
    )
}