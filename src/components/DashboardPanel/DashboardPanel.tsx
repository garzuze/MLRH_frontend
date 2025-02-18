import Grid from "./Grid";
import TopBar from "./TopBar";
import { useAuth } from "../../context/AuthContext";
import getDate from "./getDate";

export default function DashboardPanel() {
    const { user } = useAuth();
    const currentDate = getDate();
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-[220vh] ">

            <TopBar title={`Bom dia, ${user?.first_name}!`} subtitle={currentDate} />
            <Grid />
        </div>
    )
}