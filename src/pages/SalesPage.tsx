import getDate from "../utils/getDate";
import TopBar from "../components/DashboardPanel/TopBar";
import SalesCards from "../components/SalesPage/SalesCards";
import Grid from "../components/ui/Grid";


export default function SalesPage() {
    const currentDate = getDate();
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-full">
            <TopBar title="Vendas" subtitle={currentDate}></TopBar>
            <Grid>
                <SalesCards />
            </Grid>
        </div>
    )
}