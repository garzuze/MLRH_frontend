import getDate from "../utils/getDate";
import TopBar from "../components/DashboardPanel/TopBar";
import SelectionCards from "../components/SelectionPage/SelectionCards";
import Grid from "../components/ui/Grid";

export default function SelectionPage() {
    const currentDate = getDate();
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-full">
            <TopBar title="Seleção" subtitle={currentDate}></TopBar>
            <Grid>
                <SelectionCards />
            </Grid>
        </div>
    )
}