import getDate from "../components/DashboardPanel/getDate";
import TopBar from "../components/DashboardPanel/TopBar";

export default function Sales() {
    const currentDate = getDate();
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-[220vh]">
            <TopBar title="Vendas" subtitle={currentDate}></TopBar>
        </div>
    )
}