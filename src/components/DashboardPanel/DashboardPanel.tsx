import Grid from "./Grid";
import TopBar from "./TopBar";

export default function DashboardPanel() {
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-[220vh] ">
            <TopBar />
            <Grid />
        </div>
    )
}