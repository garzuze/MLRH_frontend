import { useAuth } from "../contexts/AuthContext";
import { SlimProfileType } from "../types/SlimProfileType";
import { statusAbbreviation } from "../utils/constants";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

export const useSlimProfiles = (id?: number, status?: statusAbbreviation, options = { enabled: true }) => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    const queryKey = id ? ['profiles', token, id] : ['profiles', token];

    return useQuery<SlimProfileType[]>({
        queryKey,
        queryFn: async () => {
            const url = id ? `hr/slim_profile/${id}` : status ? `hr/slim_profile?status=${status}` : "hr/slim_profile/"
            const response = await axiosClient.get(url);
            return response.data;
        },
        retry: false,
        staleTime: 300000,
        ...options,
    })
}