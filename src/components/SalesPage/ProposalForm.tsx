import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useClient } from "../../contexts/ClientContext"
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import Snackbar from "../ui/Snackbar";
import { ClientType } from "../../types/ClientType";
import { ClientContactType } from "../../types/ClientContactType";
import Button from "../ui/Button";
import { ClientFeeType } from "../../types/ClientFeeType";

export default function ProposalForm() {
    const { client } = useClient();
    const { token } = useAuth();

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [clientData, setClientData] = useState<ClientType>();
    const [clientContactData, setClientContactData] = useState<ClientContactType[]>();
    const [clientFeeData, setClientFeeData] = useState<ClientFeeType[]>();

    const [isContactSelectOpen, setIsContactSelectOpen] = useState<boolean>(false);

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
            if (response.status === 200) {
                const newContactData: ClientContactType[] = response.data;

                setClientContactData(newContactData);
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

    const getClientFeeData = async (clientId: number) => {
        try {
            const axiosClient = axios.create({
                baseURL: "http://127.0.0.1:8000/",
            });

            const config: AxiosRequestConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                } as RawAxiosRequestHeaders
            };

            const response: AxiosResponse = await axiosClient.get(`/clients/get_client_fees/?q=${clientId}`, config);
            if (response.status === 200) {
                const newClientFeeData: ClientFeeType[] = response.data;
                setClientFeeData(newClientFeeData);
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
        if (client) {
            getClientData(client.id);
            getClientContactData(client.id);
            getClientFeeData(client.id)
        }
    }, [])

    useEffect(() => {
        console.log(clientContactData)
        if (clientContactData && clientContactData.length > 1) {
            setIsContactSelectOpen(true);
        } else {
            setIsContactSelectOpen(false);
        }
    }, [clientContactData]);

    return (
        <>
            {isContactSelectOpen ? (
                <>
                    <p>Opa! Parece que tem mais de um contato para essa empresa. Qual deles você quer na proposta?</p>
                    <ul className="space-y-1 list-disc list-inside">
                        {clientContactData?.map((contact) => {
                            return <li
                                value={contact.id}
                                key={contact.id}
                                onClick={() => setClientContactData(clientContactData?.filter(c => c.id === contact.id))}
                                className="cursor-pointer hover:underline"
                            >
                                {contact.name}
                            </li>
                        })}
                    </ul>
                </>
            ) : <p>{clientContactData ? (clientContactData[0].name) : ""}</p>}
            {clientFeeData? `${clientFeeData[0].percentual} %` : null}
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </>
    )
}