import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { axiosClient, axiosConfig } from "../utils/constants";

export interface positionType{
    id: number;
    title: string;
}

export const usePositions = () => {
    const { token } = useAuth();
    const [positions, setPositions] = useState<positionType[]>([]);
    const [loadingPositions, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response: AxiosResponse = await axiosClient.get("/hr/positions/", axiosConfig);
                setPositions(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchPositions();
    }, [token])

    return { positions, loadingPositions };
}