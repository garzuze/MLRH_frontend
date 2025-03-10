import { AxiosResponse } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { axiosClient, axiosConfig } from "../utils/constants";
import { ProfileType } from "../types/ProfileType";

export const useProfiles = () => {
    const { token } = useAuth();
    const [profiles, setProfiles] = useState<ProfileType[]>([]);
    const [loadingProfiles, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response: AxiosResponse = await axiosClient.get("/hr/profile/", axiosConfig);
                setProfiles(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchProfiles();
    }, [token])

    return { profiles, loadingProfiles };
}