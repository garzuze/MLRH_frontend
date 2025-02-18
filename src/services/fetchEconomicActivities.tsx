import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export interface economicActivityType{
    id: number;
    title: string;
}

export const useEconomicActivities = () => {
    const { token } = useAuth();
    const [economicActivities, setEconomicActivities] = useState<economicActivityType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEconomicActivities = async () => {
            try {
                const client = axios.create({
                    baseURL: "http://127.0.0.1:8000/",
                });
            
                const config: AxiosRequestConfig = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    } as RawAxiosRequestHeaders,
                };

                const response: AxiosResponse = await client.get("/clients/economic_activity/", config);
                setEconomicActivities(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchEconomicActivities();
    }, [token])

    return { economicActivities, loading };
}