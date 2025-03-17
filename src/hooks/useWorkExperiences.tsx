import { AxiosResponse } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useAxiosClient } from "./useAxiosClient";
import { WorkExperienceType } from "../types/WorkExperienceType";
import { useQuery } from "@tanstack/react-query";

export const useWorkExperiences = () => {
    const axiosClient = useAxiosClient();
    
    return useQuery<WorkExperienceType[]>({
        queryKey: ['workExperiences'],
        queryFn: async () => {
            const response = await axiosClient.get("/hr/work_experience/");
            return response.data;
        },
        staleTime: 300000,
    })
}