import { useAuth } from "../contexts/AuthContext";
import { ReportType } from "../types/ReportType";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

export const useReports = (id?: number | number[], options = { enabled: true }) => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    const queryKey = id ? ['reports', token, id] : ['reports', token];

    return useQuery<ReportType[]>({
        queryKey: queryKey,
        queryFn: async () => {
            const url = id ? `hr/report/?id=${Array.isArray(id) ? id.join(",") : id}` : "hr/report/"
            const response = await axiosClient.get(url);
            return response.data;
        },
        staleTime: 300000,
        retry: false,
        ...options
    })
}