import { useAuth } from "../contexts/AuthContext";
import { ClientContactType } from "../types/ClientContactType";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

export const useClientContact = (id?: number, options = { enabled: true }) => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    const queryKey = id ? ['client_contact', token, id] : ['client_contact', token];

    return useQuery<ClientContactType[]>({
        queryKey,
        queryFn: async () => {
            const url = id ? `/clients/get_client_contacts/?q=${id}` : "clients/client_contact/"
            const response = await axiosClient.get(url);
            return response.data;
        },
        retry: false,
        staleTime: 300000,
        ...options,
    })
}