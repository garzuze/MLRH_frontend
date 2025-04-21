import { useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "./useAxiosClient";
import { useAuth } from "../contexts/AuthContext";
import { mlrhUser } from "../types/TokenResponse";

export const useMlrhUser = (id?:  number, options = { enabled: true }) => {
    const axiosClient = useAxiosClient();
    const { token } = useAuth();
    const queryKey = id ? ['user', token, id] : ['user', token];

    return useQuery<mlrhUser>({
        queryKey,
        queryFn: async () => {
            const url = id ? `users/${id}` : "users"
            console.log(url)
            const response = await axiosClient.get(url);
            console.log(response.data)
            return response.data;
        },
        staleTime: 300000,
        retry: false,
        ...options,
    });
};
