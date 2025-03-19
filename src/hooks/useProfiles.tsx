import { useAuth } from "../contexts/AuthContext";
import { ProfileType } from "../types/ProfileType";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

export const useProfiles = (id?:  number) => {
    const { token } = useAuth();    
    const axiosClient = useAxiosClient();
    const queryKey = id ? ['profiles', token, id] : ['profiles', token];

    const { data: profiles = [], isLoading: loadingProfiles, error: profilesError } = useQuery<ProfileType[]>({
        queryKey,
        queryFn: async () => {
            const url = id ? `hr/profile/${id}` : "hr/profile/"
            const response = await axiosClient.get(url);
            return response.data;
        },
        staleTime: 300000,
    })

    return { profiles, loadingProfiles, profilesError };
}