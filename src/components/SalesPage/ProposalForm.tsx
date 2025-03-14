import { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { useClient } from "../../contexts/ClientContext"
import { useEffect, useState } from "react";
import Snackbar from "../ui/Snackbar";
import { ClientType } from "../../types/ClientType";
import { ClientContactType } from "../../types/ClientContactType";
import { ClientFeeType } from "../../types/ClientFeeType";
import { useServices } from "../../hooks/useServices";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ProposalPDF } from "./pdf/ProposalPDF";
import getDate from "../DashboardPanel/getDate";
import { fetchClientContactData } from "../../services/useClientContact";
import { fetchClientFees } from "../../services/useClientFees";
import { useAxiosClient } from "../../hooks/useAxiosClient";

export default function ProposalForm() {
    const { client } = useClient();
    const { services, loadingServices } = useServices();
    const axiosClient = useAxiosClient();
    
    const currentDate = getDate();

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isContactSelectOpen, setIsContactSelectOpen] = useState<boolean>(false);

    const [clientData, setClientData] = useState<ClientType>();
    const [clientContactData, setClientContactData] = useState<ClientContactType[]>([]);
    const [clientFeeData, setClientFeeData] = useState<ClientFeeType[]>([]);



    const getClientData = async (clientId: number) => {
        try {
            const response: AxiosResponse = await axiosClient.get(`/clients/clients/${clientId}`);
            if (response.status === 200) {
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
        const newContactData = await fetchClientContactData(axiosClient, clientId);
        if (Array.isArray(newContactData) && newContactData.length > 0) {
            setClientContactData(newContactData);
        } else {
            setSnackbarMessage("Você precisa cadastrar um contato...")
            setIsSnackbarOpen(true)
        }
    }

    const getClientFeeData = async (clientId: number) => {
        const newClientFeeData = await fetchClientFees(axiosClient, clientId);
        if (Array.isArray(newClientFeeData) && newClientFeeData.length > 0) {
            setClientFeeData(newClientFeeData);
        } else {
            setSnackbarMessage("Nenhum dado de honorário encontrado...")
            setIsSnackbarOpen(true)
        }
    }

    useEffect(() => {
        if (client) {
            getClientContactData(client.id);
            getClientData(client.id);
            getClientFeeData(client.id)
        }
    }, [client])

    useEffect(() => {
        setIsContactSelectOpen(clientContactData.length > 1);
    }, [clientContactData]);

    if (!clientData || !clientContactData || !clientFeeData || clientContactData.length === 0) {
        return (
            <>
                {snackbarMessage}
                <Snackbar
                    message={snackbarMessage}
                    isOpen={isSnackbarOpen}
                    onClose={() => setIsSnackbarOpen(false)}
                />
            </>
        );
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
                        <p>Empresa: <b>{clientData.corporateName}</b></p>
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
                        <button className="p-2 bg-black font-semibold rounded text-stone-100">
                            <PDFDownloadLink
                                document={<ProposalPDF clientData={clientData} clientContactData={clientContactData[0]} clientFeeData={clientFeeData} services={services} />}
                                fileName={`Proposta - ${client?.corporateName} - ${currentDate}.pdf`}
                            >
                                {({ loading }) => (loading ? "Gerando PDF..." : "Exportar para PDF")}
                            </PDFDownloadLink>

                        </button>
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

