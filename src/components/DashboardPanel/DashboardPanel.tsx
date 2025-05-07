import TopBar from "./TopBar";
import { useAuth } from "../../contexts/AuthContext";
import getDate from "../../utils/getDate";
import StatCards from "./StatCards";
import Grid from "../ui/Grid";

export default function DashboardPanel() {
    const { user } = useAuth();
    const currentDate = getDate();
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-full">
            <TopBar title={`Bem-vindo, ${user?.firstName}!`} subtitle={currentDate} />
            <Grid>
                <StatCards />
            </Grid>
        </div>
    )
}