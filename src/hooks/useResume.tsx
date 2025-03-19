import { useQuery } from "@tanstack/react-query";
import { useAxiosClient } from "../hooks/useAxiosClient";
import { ResumeType } from "../types/ResumeType";
import { useAuth } from "../contexts/AuthContext";

export const useResume = (id?:  number) => {
    const axiosClient = useAxiosClient();
    const { token } = useAuth();
    const queryKey = id ? ['resume', token, id] : ['resume', token];

    const { data: resume = [], isLoading: loadingResume, error: resumeError } =  useQuery<ResumeType[]>({
        queryKey,
        queryFn: async () => {
            const url = id ? `hr/resume/${id}` : "hr/resume/"
            console.log(url)
            const response = await axiosClient.get(url);
            return response.data;
        },
        staleTime: 300000,
    });
    return { resume, loadingResume, resumeError };
};
