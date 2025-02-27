import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { axiosClient } from "../utils/constants";

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
                const config: AxiosRequestConfig = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    } as RawAxiosRequestHeaders,
                };

                const response: AxiosResponse = await axiosClient.get("/clients/services/", config);
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