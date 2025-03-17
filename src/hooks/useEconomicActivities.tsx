import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useAxiosClient } from "./useAxiosClient";
import { economicActivityType } from "../types/economicActivityType";

export const useEconomicActivities = () => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();

    const { data: economicActivities = [], isLoading: loadingEconomicActivities, error: economicActivitiesError } = useQuery<economicActivityType[]>({
        queryKey: ['economicActivities', token],
        queryFn: async () => {
            const response = await axiosClient.get("clients/economic_activity/");
            return response.data;
        },
        enabled: !!token,
        staleTime: 300000,
    });

    return { economicActivities, loadingEconomicActivities, economicActivitiesError };
}   