import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useAxiosClient } from "./useAxiosClient";
import { serviceType } from "../types/serviceType";
import { useQuery } from "@tanstack/react-query";

export const useServices = () => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();

    const { data: services = [], isLoading: loadingServices, error: servicesError } = useQuery<serviceType[]>({
        queryKey: ['services', token],
        queryFn: async () => {
            const response = await axiosClient.get("/clients/services/");
            return response.data;
        },
        staleTime: 300000,
    });

    return { services, loadingServices, servicesError };
}