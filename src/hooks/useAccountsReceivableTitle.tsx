import { useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "./useAxiosClient";
import { useAuth } from "../contexts/AuthContext";
import { mlrhUser } from "../types/TokenResponse";

export const useAccountsReceivableTitle = (id?:  number, options = { enabled: true }) => {
    const axiosClient = useAxiosClient();
    const { token } = useAuth();
    const queryKey = id ? ['receivable_title', token, id] : ['receivable_title', token];

    return useQuery<AccountsReceivableTitleType[]>({
        queryKey,
        queryFn: async () => {
            const url = id ? `finance/receivable_title/${id}` : "finance/receivable_title"
            const response = await axiosClient.get(url);
            return response.data;
        },
        staleTime: 300000,
        retry: false,
        ...options,
    });
};
