import { useAuth } from "../contexts/AuthContext";
import { ProfileType } from "../types/ProfileType";
import { statusAbbreviation } from "../utils/constants";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

export const useProfiles = (id?: number, status?: statusAbbreviation, options = { enabled: true }) => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    const queryKey = id ? ['profiles', token, id] : ['profiles', token];

    return useQuery<ProfileType[]>({
        queryKey,
        queryFn: async () => {
            const url = id ? `hr/profile/${id}` : status ? `hr/profile?status=${status}` : "hr/profile/"
            const response = await axiosClient.get(url);
            return response.data;
        },
        retry: false,
        staleTime: 300000,
        ...options,
    })
}