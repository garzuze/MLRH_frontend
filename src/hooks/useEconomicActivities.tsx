import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { axiosClient, axiosConfig } from "../utils/constants";

export interface economicActivityType{
    id: number;
    title: string;
}

export const useEconomicActivities = () => {
    const { token } = useAuth();
    const [economicActivities, setEconomicActivities] = useState<economicActivityType[]>([]);
    const [loadingEconomicActivities, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEconomicActivities = async () => {
            try {
                const response: AxiosResponse = await axiosClient.get("/clients/economic_activity/", axiosConfig);
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