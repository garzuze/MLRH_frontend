import { AxiosResponse } from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useAxiosClient } from "./useAxiosClient";
import { benefitType } from "../types/benefitType";

export const useBenefits = () => {
    const { token } = useAuth();
    const axiosClient = useAxiosClient();
    const [benefits, setBenefits] = useState<benefitType[]>([]);
    const [loadingBenefits, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBenefits = async () => {
            try {
                const response: AxiosResponse = await axiosClient.get("/clients/benefits/");
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