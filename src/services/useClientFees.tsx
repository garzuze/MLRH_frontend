import { AxiosResponse } from "axios";
import { axiosClient, axiosConfig } from "../utils/constants";
import { ClientFeeType } from "../types/ClientFeeType";

export const fetchClientFees = async (clientId: number) => {
    try {
        const response: AxiosResponse = await axiosClient.get(`/clients/get_client_fees/?q=${clientId}`, axiosConfig);
        if (response.status === 200) {
            const newClientFeeData: ClientFeeType[] = response.data;
            return newClientFeeData;
        } else {
            console.log("No fee data avaliable")
            return false;
        }

    } catch (error) {
        console.log(error)
        return false;
    }
}