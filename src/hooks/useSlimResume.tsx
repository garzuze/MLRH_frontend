import { useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "../hooks/useAxiosClient";
import { SlimResumeType } from "../types/SlimResumeType";
import { useAuth } from "../contexts/AuthContext";

export const useSlimResume = (id?:  number, options = { enabled: true }) => {
    const axiosClient = useAxiosClient();
    const { token } = useAuth();
    const queryKey = id ? ['slim_resume', token, id] : ['slim_resume', token];

    return useQuery<SlimResumeType[]>({
        queryKey,
        queryFn: async () => {
            const url = id ? `hr/slim_resume/${id}` : "hr/slim_resume/"
            const response = await axiosClient.get(url);
            return response.data;
        },
        staleTime: 300000,
        ...options,
    });
};
