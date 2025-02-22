import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useClient } from "../../contexts/ClientContext"
import { useAuth } from "../../contexts/AuthContext";
import { ReactNode, useEffect, useState } from "react";
import Snackbar from "../ui/Snackbar";
import { ClientType } from "../../types/ClientType";
import { ClientContactType } from "../../types/ClientContactType";
import Button from "../ui/Button";
import { ClientFeeType } from "../../types/ClientFeeType";
import { useServices } from "../../services/useServices";

export default function ProposalForm() {
    const { client } = useClient();
    const { token } = useAuth();

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [clientData, setClientData] = useState<ClientType>();
    const [clientContactData, setClientContactData] = useState<ClientContactType[]>([]);
    const [clientFeeData, setClientFeeData] = useState<ClientFeeType[]>([]);

    const { services, loadingServices } = useServices();

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
        if (client && clientContactData.length < 1) {
            setSnackbarMessage("Você precisa cadastrar um contato!")
            setIsSnackbarOpen(true);
        }

        if (client) {
            getClientData(client.id);
            getClientContactData(client.id);
            getClientFeeData(client.id)
        }
    }, [])

    useEffect(() => {
        if (clientContactData && clientContactData.length > 1) {
            setIsContactSelectOpen(true);
        } else {
            setIsContactSelectOpen(false);
        }
    }, [clientContactData, client]);

    if (!clientData || !clientContactData || !clientFeeData) {
        return <div>Carregando...</div>
    } else {
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
                                    {contact.name} - {contact.department}
                                </li>
                            })}
                        </ul>
                    </>
                ) : loadingServices ? (
                    <p>Carregando...</p>
                ) : (
                    <div>
                        <p>Empresa: <b>{clientData.corporate_name}</b></p>
                        <p>{clientData.city} - {clientData.state}</p>
                        <p>Contato: <b>{clientContactData.length > 0
                            ? `${clientContactData[0].name} - ${clientContactData[0].department}`
                            : "Nenhum contato disponível. Favor cadastrar contato"}</b>
                        </p>
                        <p><b>Investimento</b></p>
                        <ul className="space-y-1 list-disc list-inside">
                            {clientFeeData.map((fee) => {
                                return <li key={fee.id} value={fee.id}>
                                    {services.find(s => s.id === fee.service)?.service} -
                                    {(fee.percentual && fee.value) ? `${fee.percentual}% - ${fee.value}` : (
                                        fee.percentual ? (`${fee.percentual}%`) : (`R$${fee.value}%`)
                                    )} {(fee.deadline || fee.deadline !== null) ?? (`Prazo: ${fee.deadline}`)} </li>
                            })}
                        </ul>
                        <Button variant="dark" text="Gerar PDF"></Button>
                    </div>
                )
                }

                <Snackbar
                    message={snackbarMessage}
                    isOpen={isSnackbarOpen}
                    onClose={() => setIsSnackbarOpen(false)}
                />
            </>
        )
    };

}