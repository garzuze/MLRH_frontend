import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useAxiosClient } from "./useAxiosClient";
import { benefitType } from "../types/benefitType";

export const useBenefits = () => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();

    const { data: benefits = [], isLoading: loadingBenefits, error: benefitsError } = useQuery<benefitType[]>({
        queryKey: ['benefits', token],
        queryFn: async () => {
            const response = await axiosClient.get('/clients/benefits/');
            return response.data;
        },
        enabled: !!token,
        staleTime: 300000, 
    });

    return { benefits, loadingBenefits, benefitsError };
};