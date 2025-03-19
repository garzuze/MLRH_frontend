import { useAuth } from "../contexts/AuthContext";
import { ProfileType } from "../types/ProfileType";
import { ReportType } from "../types/ReportType";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

export const useReports = () => {
    const { token } = useAuth();    
    const axiosClient = useAxiosClient();
    const { data: reports = [], isLoading: loadingReports, error: reportsError } = useQuery<ReportType[]>({
        queryKey: ['reports', token],
        queryFn: async () => {
            const response = await axiosClient.get("hr/report/");
            return response.data;
        },
        staleTime: 300000,
    })

    return { reports, loadingReports, reportsError };
}