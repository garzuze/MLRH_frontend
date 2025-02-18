import DashboardPanel from "../components/DashboardPanel/DashboardPanel";
import Sidebar from "../components/Sidebar/Sidebar";
import Button from "../components/ui/Button";

export default function Dashboard() {
    return (
        <main className="grid gap-4 p-4 grid-cols-[220px,_1fr] bg-stone-100 text-stone-950 font-roboto">
            <Sidebar />
            <DashboardPanel />
        </main>
    )
}