import TopBar from "../components/DashboardPanel/TopBar";
import FinanceCards from "../components/FinancePage/FinanceCards";
import Grid from "../components/ui/Grid";
import getDate from "../utils/getDate";

const FinancePage = () => {
    const currentDate = getDate();
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-full">
            <TopBar title="Financeiro" subtitle={currentDate}></TopBar>
            <Grid>
                <FinanceCards />
            </Grid>
        </div>
    )
};

export default FinancePage