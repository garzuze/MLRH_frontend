import { AxiosInstance, AxiosResponse } from "axios";
import { ClientFeeType } from "../types/ClientFeeType";

export const fetchClientFees = async (axiosClient: AxiosInstance, clientId: number) => {
    try {
        const response: AxiosResponse = await axiosClient.get(`/clients/get_client_fees/?q=${clientId}`);
        if (response.status === 200 && Array.isArray(response.data)) {
            const newClientFeeData: ClientFeeType[] = response.data;
            return newClientFeeData;
        } else {
            console.log("No fee data avaliable")
            return [];
        }
    } catch (error) {
        return [];
    }
}