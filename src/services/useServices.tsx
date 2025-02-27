import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { axiosClient, axiosConfig } from "../utils/constants";

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
                const response: AxiosResponse = await axiosClient.get("/clients/services/", axiosConfig);
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