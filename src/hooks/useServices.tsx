import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useAxiosClient } from "./useAxiosClient";

export interface serviceType{
    id: number;
    service: string;
}

export const useServices = () => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    
    const [services, setServices] = useState<serviceType[]>([]);
    const [loadingServices, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response: AxiosResponse = await axiosClient.get("/clients/services/");
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