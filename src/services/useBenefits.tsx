import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { axiosClient, axiosConfig } from "../utils/constants";

export interface benefitType{
    id: number;
    benefit: string;
}

export const useBenefits = () => {
    const { token } = useAuth();
    const [benefits, setBenefits] = useState<benefitType[]>([]);
    const [loadingBenefits, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBenefits = async () => {
            try {
                const response: AxiosResponse = await axiosClient.get("/clients/benefits/", axiosConfig);
                setBenefits(response.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
        fetchBenefits();
    }, [token])

    return { benefits, loadingBenefits };
}