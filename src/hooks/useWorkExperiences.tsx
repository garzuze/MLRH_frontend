import { useAxiosClient } from "./useAxiosClient";
import { WorkExperienceType } from "../types/WorkExperienceType";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";

export const useWorkExperiences = (id?: number) => {
    const axiosClient = useAxiosClient();
    const { token } = useAuth();
    const queryKey = id ? ['workExperiences', token, id] : ['workExperiences', token];

    const { data: experieces = [], isLoading: laodingExperiences, error: experiecesError } = useQuery<WorkExperienceType[]>({
        queryKey: queryKey,
        queryFn: async () => {
            const url = id ? `hr/work_experience/?resume=${id}` : "hr/work_experience/"
            const response = await axiosClient.get(url);
            return response.data;
        },
        staleTime: 300000,
    })
    return { experieces, laodingExperiences, experiecesError }
};