import { useAuth } from "../contexts/AuthContext";
import { ProfileType } from "../types/ProfileType";
import { useAxiosClient } from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

export const useProfiles = () => {
    const { token } = useAuth();    
    const axiosClient = useAxiosClient();
    const { data: profiles = [], isLoading: loadingProfiles, error: profilesError } = useQuery<ProfileType[]>({
        queryKey: ['profiles', token],
        queryFn: async () => {
            const response = await axiosClient.get("hr/profile/");
            return response.data;
        },
        staleTime: 300000,
    })

    return { profiles, loadingProfiles, profilesError };
}