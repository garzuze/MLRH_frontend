import { AxiosResponse } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useAxiosClient } from "./useAxiosClient";
import { WorkExperienceType } from "../types/WorkExperienceType";

export const useWorkExperiences = () => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    
    const [WorkExperiences, setWorkExperiences] = useState<WorkExperienceType[]>([]);
    const [loadingWorkExperiences, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWorkExperiences = async () => {
            try {
                const response: AxiosResponse = await axiosClient.get("/hr/work_experience/");
                setWorkExperiences(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchWorkExperiences();
    }, [token])

    return { WorkExperiences, loadingWorkExperiences };
}