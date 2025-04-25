import getDate from "../utils/getDate";
import TopBar from "../components/DashboardPanel/TopBar";
import { ResumeTable } from "../components/ResumePage/ResumeTable";

export default function ResumeListPage() {
    const currentDate = getDate();
    return (
        <div className="bg-white border rounded-lg pb-4 shadow h-full">
            <TopBar title="Currículos" subtitle={currentDate}></TopBar>
            <ResumeTable />
        </div>
    )
}