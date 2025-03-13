import { AxiosResponse } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useAxiosClient } from "./useAxiosClient";

export interface economicActivityType{
    id: number;
    title: string;
}

export const useEconomicActivities = () => {
    const { token } = useAuth();
    const [economicActivities, setEconomicActivities] = useState<economicActivityType[]>([]);
    const [loadingEconomicActivities, setLoading] = useState<boolean>(true);
    const axiosClient = useAxiosClient();

    useEffect(() => {
        const fetchEconomicActivities = async () => {
            try {
                const response: AxiosResponse = await axiosClient.get("/clients/economic_activity/");
                setEconomicActivities(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchEconomicActivities();
    }, [token])

    return { economicActivities, loadingEconomicActivities };
}