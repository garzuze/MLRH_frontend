import { Outlet } from "react-router-dom";
import DashboardPanel from "../components/DashboardPanel/DashboardPanel";
import Sidebar from "../components/Sidebar/Sidebar";

export default function AdminPanel() {
    return (
        <main className="grid gap-4 p-4 grid-cols-[220px,_1fr] bg-stone-100 text-stone-950 font-roboto">
            <Sidebar />
            <Outlet />
        </main>
    )
}