import { AxiosResponse } from "axios";
import { ClientContactType } from "../types/ClientContactType";
import { axiosClient, axiosConfig } from "../utils/constants";

export const fetchClientContactData = async (clientId: number) => {
    try {
        const response: AxiosResponse = await axiosClient.get(`/clients/get_client_contacts/?q=${clientId}`, axiosConfig);
        console.log(response);
        if (response.status === 200 && response.data.length > 0) {
            const newContactData: ClientContactType[] = response.data;
            return newContactData;
        } else {
            console.log("No contact data avaliable")
            return false;
        }

    } catch (error) {
        console.log(error)
        return false;
    }
}