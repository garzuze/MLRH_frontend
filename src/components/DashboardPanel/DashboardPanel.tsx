import Grid from "./Grid";
import TopBar from "./TopBar";
import { useAuth } from "../../contexts/AuthContext";
import getDate from "./getDate";

export default function DashboardPanel() {
    const { user } = useAuth();
    const currentDate = getDate();
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-full">

            <TopBar title={`Bom dia, ${user?.firstName}!`} subtitle={currentDate} />
            <Grid />
        </div>
    )
}