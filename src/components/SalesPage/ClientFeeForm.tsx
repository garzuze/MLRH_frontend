import { useEffect, useState } from "react";

import { AxiosResponse, AxiosError } from "axios";
import Button from "../ui/Button";
import Snackbar from "../ui/Snackbar";
import { useServices } from "../../hooks/useServices";
import { useClient } from "../../contexts/ClientContext";
import { ClientFeeType } from "../../types/ClientFeeType";
import ClientSelector from "../form/ClientAutocompletInput";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import ServiceInput from "./ServiceInput";

export default function ClientFeeForm() {
    const { client, setClient, setProposalComponent } = useClient();
    const axiosClient = useAxiosClient();

    // Honorários que são cadastrados por padrão para todos os clientes
    const initialFees: ClientFeeType[] = [
        { client: 0, service: 1, percentual: 50 },
        { client: 0, service: 2, percentual: 70 },
        { client: 0, service: 3, percentual: 100 },
    ]

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Formulário para cadastrar mais um honorário
    // Formulário para gerar proposta
    const [isServiceFormOpen, setIsServiceFormOpen] = useState<boolean>(false)
    const [isCreateProposalOpen, setIsCreateProposalOpen] = useState<boolean>(false);

    // Os honorários são armazenados em estado
    const [clientFees, setClientFees] = useState<ClientFeeType[]>(initialFees);
    const { services, loadingServices, servicesError } = useServices();

    async function createClientFee() {
        try {
            const responses = await Promise.all(clientFees.map((fee) => {
                return axiosClient.post("/clients/client_fee/", fee);
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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsCreateProposalOpen(true);
        createClientFee();
    }

    async function getPrevFeeData(clientId: number) {
        try {
            const response: AxiosResponse = await axiosClient.get(`/clients/get_client_fees/?q=${clientId}`);
            if (response.data.length >= 3) {
                // Se ele já tiver os três honorários padrão, pode-se criar a proposta
                setIsCreateProposalOpen(true)
                setClientFees(response.data);
            }
        } catch (error) {
            setSnackbarMessage("Ops... Alguma coisa deu errado.");
            setIsSnackbarOpen(true);
        }
    }

    const handleChange = (serviceId: number, name: string, value: number) => {
        // Atualiza os honorários conforme o usuário digita
        const fees = clientFees.map(fee => fee.service === serviceId ? { ...fee, [name]: value } : fee);
        setClientFees(fees);
    };

    // useEffect para pegar honorários anteriores, caso já existam
    useEffect(() => {
        if (client) {
            getPrevFeeData(client.id);
            setClientFees((prevFees) =>
                prevFees.map((fee) => ({ ...fee, client: client?.id || 0 }))
            );
        }
    }, [client]);

    const serviceDefinitions = [
        { id: 1, label: "Operacional e Administrativo" },
        { id: 2, label: "Técnicos e Especializados" },
        { id: 3, label: "Liderança, Coordenação, Supervisão e Gerência" },
    ];


    return (
        <>
            <form method="post" onSubmit={handleSubmit}>
                <ClientSelector selectedClient={client} setSelectedClient={setClient} />

                <div className="services">
                    {serviceDefinitions.map((service) => {
                        return (
                            <ServiceInput
                                key={service.id}
                                serviceId={service.id}
                                label={service.label}
                                clientFees={clientFees}
                                onChange={handleChange}
                            />
                        )
                    })}
                </div>
                {isServiceFormOpen ? (
                    <>
                        <p className="placeholder:text-sm placeholder:text-stone-400 text-sm w-full mt-4">
                            Novo serviço
                        </p>
                        <div>
                            <select name="service" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full" defaultValue="" onChange={(event) => setClientFees((prevFees) => prevFees.map((fee) => (fee.service === prevFees[prevFees.length - 1].service ? { ...fee, service: Number(event.target.value) } : fee)))}>
                                {servicesError ? <option value="" disabled>House um erro</option> :
                                    <option value={'servico'} key={"servico"} disabled>Serviço</option>
                                }
                                {loadingServices ? (
                                    <option>Carregando....</option>
                                ) : (
                                    services.slice(3).map((service, _) => (
                                        <option value={service.id} key={service.id}>{service.service}</option>
                                    ))
                                )}
                            </select>
                            <div className="w-full flex gap-x-4">
                                <input type="number" name="percentual" placeholder="Percentual" className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" required
                                    onChange={(event) => handleChange(clientFees[clientFees.length - 1].service, event.target.name, Number(event.target.value))}
                                />
                                <input type="number" name="value" placeholder="Valor" className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(event) => handleChange(clientFees[clientFees.length - 1].service, event.target.name, Number(event.target.value))} />
                                <input type="number" name="deadline" placeholder="Prazo" className="placeholder:text-sm placeholder:text-stone-400 text-sm border-b border-stone-300 w-1/3 mt-4 focus:outline-none focus:border-stone-700" onChange={(event) => handleChange(clientFees[clientFees.length - 1].service, event.target.name, Number(event.target.value))} />
                            </div>
                        </div>
                    </>
                )
                    : <p className="my-4 text-sm text-right underline cursor-pointer text-stone-700" onClick={() => { setIsServiceFormOpen(true); setClientFees([...clientFees, { client: client?.id || 0, service: 4, percentual: 0 }]) }}>
                        Adicionar mais um serviço
                    </p>
                }

                <Button text={"Cadastrar Valores dos serviços"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>
            </form>
            {isCreateProposalOpen ? (
                <p className="my-4 text-sm text-right underline cursor-pointer text-stone-700" onClick={() => { setProposalComponent(true); }}>
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
