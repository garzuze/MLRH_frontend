import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export interface serviceType{
    id: number;
    service: string;
}

export const useServices = () => {
    const { token } = useAuth();
    const [services, setServices] = useState<serviceType[]>([]);
    const [loadingServices, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const client = axios.create({
                    baseURL: "http://127.0.0.1:8000/",
                });
            
                const config: AxiosRequestConfig = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    } as RawAxiosRequestHeaders,
                };

                const response: AxiosResponse = await client.get("/clients/services/", config);
                setServices(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchServices();
    }, [token])

    return { services, loadingServices };
}