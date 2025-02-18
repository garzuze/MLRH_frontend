import getDate from "../components/DashboardPanel/getDate";
import TopBar from "../components/DashboardPanel/TopBar";
import Grid from "../components/SalesPage/Grid";

export default function SalesPage() {
    const currentDate = getDate();
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-[220vh]">
            <TopBar title="Vendas" subtitle={currentDate}></TopBar>
            <Grid/>
        </div>
    )
}