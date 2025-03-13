// services/clientService.ts
import { AxiosInstance, AxiosResponse } from "axios";
import { ClientContactType } from "../types/ClientContactType";

export const fetchClientContactData = async (
    axiosClient: AxiosInstance,
    clientId: number
): Promise<ClientContactType[]> => {
    try {
        const response: AxiosResponse = await axiosClient.get(
            `/clients/get_client_contacts/?q=${clientId}`
        );
        if (response.status === 200 && Array.isArray(response.data)) {
            return response.data as ClientContactType[];
        } else {
            console.log("No contact data available");
            return [];
        }
    } catch (error) {
        return [];
    }
};
