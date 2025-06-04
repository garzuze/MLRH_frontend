import { useAuth } from "../contexts/AuthContext";
import { ReportType } from "../types/ReportType";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

interface Filter {
    id?: number | number[];
    invoiceable?: boolean;
}

export const useReports = (filter?: Filter, options = { enabled: true }) => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    const queryKey = filter?.invoiceable ? ['invoiceable_reports'] : ['reports']
    token && queryKey.push(token);
    return useQuery<ReportType[]>({
        queryKey: queryKey,
        queryFn: async () => {
            const url = filter?.id ? `hr/report/?id=${Array.isArray(filter?.id) ? filter?.id.join(",") : filter?.id}` : filter?.invoiceable ? "hr/report/?invoiceable=true" : "hr/report/"
            const response = await axiosClient.get(url);
            return response.data;
        },
        staleTime: 300000,
        retry: false,
        ...options
    })
}