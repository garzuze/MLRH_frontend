import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import axios, { AxiosRequestConfig, RawAxiosRequestHeaders, AxiosResponse, AxiosError, Axios } from "axios";
import Button from "../ui/Button";
import AutocompleteInput from "./AutocompleteInput";
import Snackbar from "../ui/Snackbar";
import { useServices } from "../../services/useServices";
import { useClient } from "../../contexts/ClientContext";
import { ClientFeeType } from "../../types/ClientFeeType";
import { axiosClient, axiosConfig } from "../../utils/constants";

export default function ClientFeeForm() {
    const { client, proposalComponent, setProposalComponent } = useClient();
    const initialFees: ClientFeeType[] = [
        { client: 0, service: 1, percentual: 50 },
        { client: 0, service: 2, percentual: 70 },
        { client: 0, service: 3, percentual: 100 },
    ]
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isServiceFormOpen, setIsServiceFormOpen] = useState<boolean>(false)
    const { services, loadingServices } = useServices();
    const [clientFees, setClientFees] = useState<ClientFeeType[]>(initialFees);
    const [isCreateProposalOpen, setIsCreateProposalOpen] = useState<boolean>(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsCreateProposalOpen(true);
        const createClientFee = async () => {
            try {
                const responses = await Promise.all(clientFees.map((fee) => {
                    return axiosClient.post("/clients/client_fee/", fee, axiosConfig);
                }))

                responses.forEach(response => {
                    if (response.status === 201) {
                        setSnackbarMessage("Valores para serviços cadastrados!");
                        setIsSnackbarOpen(true);
                    } else if (response.status === 200) {
                        setSnackbarMessage("Valores atualizados com sucesso!")
                        setIsSnackbarOpen(true);
                    }
                });
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 400) {
                        setSnackbarMessage("Um honorário para esse serviço já foi cadastrado!");
                    } else {
                        setSnackbarMessage(`Erro no servidor: ${error.response?.status || "Desconhecido"}`);
                    }
                } else {
                    setSnackbarMessage("Ops... Alguma coisa deu errado.");
                }
                setIsSnackbarOpen(true);
            }
        }
        createClientFee();
    }

    async function getPrevFeeData(clientId: number) {
        try {
            const response: AxiosResponse = await axiosClient.get(`/clients/get_client_fees/?q=${clientId}`, axiosConfig);
            if (response.data.length >= 3) {
                setIsCreateProposalOpen(true)
                setClientFees(response.data);
            }
        } catch (error) {
            setSnackbarMessage("Ops... Alguma coisa deu errado.");
            setIsSnackbarOpen(true);
        }
    }

    const handleChange = (serviceId: number, name: string, value: number) => {
        const fees = clientFees.map(fee => fee.service === serviceId ? { ...fee, [name]: value } : fee);
        setClientFees(fees);
        console.log(clientFees)
    };

    useEffect(() => {
        if (client) {
            getPrevFeeData(client.id);
            setClientFees((prevFees) =>
                prevFees.map((fee) => ({ ...fee, client: client?.id || 0 }))
            );
            console.log(clientFees);
        }
    }, [client]);

    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <AutocompleteInput />
                <div className="services">
                    <div className="w-full">
                        <p className="text-sm w-full mt-4">
                            Operacional e Administrativo
                        </p>
                        <div className="service flex gap-x-4 w-full">
                            <input hidden readOnly name="service" value={1} required></input>
                            <input type="number" name="percentual" placeholder="Percentual" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" required onChange={(e) => handleChange(1, e.target.name, Number(e.target.value))} value={clientFees.find(fee => fee.service === 1)?.percentual || ""} />
                            <input type="number" name="value" placeholder="Valor" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(e) => handleChange(1, e.target.name, Number(e.target.value))} value={clientFees.find(fee => fee.service === 1)?.value || ""} />
                            <input type="number" name="deadline" placeholder="Prazo" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(e) => handleChange(1, e.target.name, Number(e.target.value))} value={clientFees.find(fee => fee.service === 1)?.deadline || ""} />
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="placeholder:text-sm text-sm w-full mt-4">
                            Técnicos e Especializados
                        </p>
                        <div className="service flex gap-x-4 w-full">
                            <input hidden readOnly name="service" value={2} required></input>
                            <input type="number" name="percentual" placeholder="Percentual" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" required onChange={(e) => handleChange(2, e.target.name, Number(e.target.value))} value={clientFees.find(fee => fee.service === 2)?.percentual || ""} />
                            <input type="number" name="value" placeholder="Valor" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(e) => handleChange(2, e.target.name, Number(e.target.value))} value={clientFees.find(fee => fee.service === 2)?.value || ""} />
                            <input type="number" name="deadline" placeholder="Prazo" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(e) => handleChange(2, e.target.name, Number(e.target.value))} value={clientFees.find(fee => fee.service === 2)?.deadline || ""} />
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="placeholder:text-sm text-sm w-full mt-4">
                            Liderança, Coordenação, Supervisão e Gerência
                        </p>
                        <div className="service flex gap-x-4 w-full">
                            <input hidden readOnly name="service" value={3} required></input>
                            <input type="number" name="percentual" placeholder="Percentual" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" required onChange={(e) => handleChange(3, e.target.name, Number(e.target.value))} value={clientFees.find(fee => fee.service === 3)?.percentual || ""} />
                            <input type="number" name="value" placeholder="Valor" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(e) => handleChange(3, e.target.name, Number(e.target.value))} value={clientFees.find(fee => fee.service === 3)?.value || ""} />
                            <input type="number" name="deadline" placeholder="Prazo" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(e) => handleChange(3, e.target.name, Number(e.target.value))} value={clientFees.find(fee => fee.service === 3)?.deadline || ""} />
                        </div>
                    </div>
                </div>
                {isServiceFormOpen ? (
                    <>
                        <p className="placeholder:text-sm text-sm w-full mt-4">
                            Novo serviço
                        </p>
                        <div>
                            <select name="service" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" defaultValue={"servico"} onChange={(event) => setClientFees((prevFees) => prevFees.map((fee) => (fee.service === prevFees[prevFees.length - 1].service ? { ...fee, service: Number(event.target.value) } : fee)))}>
                                <option value={'servico'} key={"servico"} disabled>Serviço</option>
                                {loadingServices ? (
                                    <option>Carregando....</option>
                                ) : (
                                    services.slice(3).map((service, _) => (
                                        <option value={service.id} key={service.id}>{service.service}</option>
                                    ))
                                )}
                            </select>
                            <div className="w-full flex gap-x-4">
                                <input type="number" name="percentual" placeholder="Percentual" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" required
                                    onChange={(event) => handleChange(clientFees[clientFees.length - 1].service, event.target.name, Number(event.target.value))}
                                />
                                <input type="number" name="value" placeholder="Valor" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(event) => handleChange(clientFees[clientFees.length - 1].service, event.target.name, Number(event.target.value))} />
                                <input type="number" name="deadline" placeholder="Prazo" className="placeholder:text-sm text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(event) => handleChange(clientFees[clientFees.length - 1].service, event.target.name, Number(event.target.value))} />
                            </div>
                        </div>
                    </>
                )
                    : <p className="my-4 text-sm text-right underline cursor-pointer text-stone-700" onClick={() => { setIsServiceFormOpen(true); setClientFees([...clientFees, { client: client?.id || 0, service: 4, percentual: 0 }]) }}>
                        Adicionar mais um serviço
                    </p>
                }

                <Button text={"Cadastrar Valores dos serviços"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4" onClick={() => { handleSubmit }}></Button>
            </form>
            {isCreateProposalOpen ? (
                <p className="my-4 text-sm text-right underline cursor-pointer text-stone-700" onClick={() => { setProposalComponent(!proposalComponent); }}>
                    Deseja criar uma proposta? Clique aqui.
                </p>
            ) : <></>}
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </>
    )
}
