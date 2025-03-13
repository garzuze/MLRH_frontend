import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useMemo } from "react";

export const useAxiosClient = () => {
    const { token } = useAuth();

    const axiosClient = useMemo(() => {
        return axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        });
    }, []);

    useEffect(() => {
        const requestInterceptor = axiosClient.interceptors.request.use((config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        return () => {
            axiosClient.interceptors.request.eject(requestInterceptor);
        };
    }, [token, axiosClient]);

    return axiosClient;
};
