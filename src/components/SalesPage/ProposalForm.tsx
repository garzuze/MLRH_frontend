import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useClient } from "../../contexts/ClientContext"
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import Snackbar from "../ui/Snackbar";
import { ClientType } from "../../types/ClientType";
import { ClientContactType } from "../../types/ClientContactType";

export default function ProposalForm() {
    const { client } = useClient();
    const { token } = useAuth();

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [clientData, setClientData] = useState<ClientType | null>(null);
    const [clientContactData, setClientContactData] = useState<ClientContactType[] | null>(null);


    const getClientData = async (clientId: number) => {
        try {
            const axiosClient = axios.create({
                baseURL: "http://127.0.0.1:8000/",
            });

            const config: AxiosRequestConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                } as RawAxiosRequestHeaders
            };

            const response: AxiosResponse = await axiosClient.get(`/clients/clients/${clientId}`, config);
            console.log(response);
            if (response.status === 200) {
                // deu boa
                setSnackbarMessage(`Recuperando dados do cliente: ${client!.corporate_name}`)
                setIsSnackbarOpen(true);
                setClientData(response.data);
            } else {
                setSnackbarMessage("Opsss, alguma coisa deu errado...")
                setIsSnackbarOpen(false)
            }

        } catch (error) {
            console.log(error)
            setSnackbarMessage("Opsss, alguma coisa deu errado...")
            setIsSnackbarOpen(false)
        }
    }

    const getClientContactData = async (clientId: number) => {
        try {
            const axiosClient = axios.create({
                baseURL: "http://127.0.0.1:8000/",
            });

            const config: AxiosRequestConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                } as RawAxiosRequestHeaders
            };

            const response: AxiosResponse = await axiosClient.get(`/clients/get_client_contacts/?q=${clientId}`, config);
            console.log(response);
            if (response.status === 200) {
                setClientContactData(response.data)
                if (response.data.length > 1) {

                }
            } else {
                setSnackbarMessage("Opsss, alguma coisa deu errado...")
                setIsSnackbarOpen(false)
            }

        } catch (error) {
            console.log(error)
            setSnackbarMessage("Opsss, alguma coisa deu errado...")
            setIsSnackbarOpen(false)
        }
    }

    useEffect(() => {
        getClientData(client!.id);
        getClientContactData(client!.id);
    }, [])

    return (
        <>
            {clientData?.corporate_name}
            <br></br>
            {clientData?.address}
            <br></br>
            {clientContactData ? (clientContactData.length > 1 ? (
                clientContactData[0].name
            ) : null) : null}
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </>
    )
}