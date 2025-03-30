import { useAuth } from "../contexts/AuthContext";
import { ClientType } from "../types/ClientType";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

export const useClientMlrh = (id?: number | number[], options = { enabled: true }) => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    const queryKey = id ? ['client', token, id] : ['client', token];

    return useQuery<ClientType[]>({
        queryKey,
        queryFn: async () => {
            const url = id ? `clients/clients/?id=${Array.isArray(id) ? id.join(",") : id}` : "clients/clients"
            const response = await axiosClient.get(url);
            return response.data;
        },
        retry: false,
        staleTime: 300000,
        ...options,
    })
}