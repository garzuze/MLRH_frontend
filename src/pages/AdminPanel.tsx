import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar/Sidebar";

export default function AdminPanel() {
    return (
        <main className="grid gap-4 p-4 grid-cols-[220px,_1fr] bg-stone-100 text-stone-950 font-roboto">
            <Sidebar />
            <Outlet />
        </main>
    )
}