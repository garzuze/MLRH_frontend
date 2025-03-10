import { useEffect, useState } from "react";
import { useEconomicActivities } from "../../services/useEconomicActivities";
import Button from "../ui/Button";
import { useBenefits } from "../../services/useBenefits";
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import Snackbar from "../ui/Snackbar";
import { useClient } from "../../contexts/ClientContext";
import { axiosClient, axiosConfig, educationLevels, maritalStatus, states } from "../../utils/constants";
import AutocompleteInput from "../form/AutocompleteInput";
import { fetchClientContactData } from "../../services/useClientContact";
import { ClientContactType } from "../../types/ClientContactType";
import { usePositions } from "../../services/usePositions";
import { ClientFeeType } from "../../types/ClientFeeType";
import { fetchClientFees } from "../../services/useClientFees";
import { useServices } from "../../services/useServices";

export default function ClientForm() {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [clientContactData, setClientContactData] = useState<ClientContactType[]>([]);
    const [clientFeeData, setClientFeeData] = useState<ClientFeeType[]>([]);

    const { client, setClient } = useClient();
    const { positions, loadingPositions } = usePositions();
    const { services, loadingServices } = useServices();

    useEffect(() => {
        try {
            const getClientContactData = async (clientId: number) => {
                const newContactData = await fetchClientContactData(clientId);
                if (Array.isArray(newContactData) && newContactData.length > 0) {
                    setClientContactData(newContactData);
                } else {
                    setSnackbarMessage("Você precisa cadastrar um contato...")
                    setIsSnackbarOpen(true)
                }
            }

            const getClientFeeData = async (clientId: number) => {
                const newFeeData = await fetchClientFees(clientId);
                if (Array.isArray(newFeeData) && newFeeData.length > 0) {
                    setClientFeeData(newFeeData);
                } else {
                    setSnackbarMessage("Nenhum honorário encontrado...")
                    setIsSnackbarOpen(true)
                }
            }
            if (client) {
                getClientContactData(client.id);
                getClientFeeData(client.id);
            }
        } catch (error) {
            console.log(error);
        }
    }, [client])


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const createProfile = async () => {
            try {
                const response: AxiosResponse = await axiosClient.post("/hr/profile/", formData, axiosConfig);
                if (response.status === 201) {
                    setSnackbarMessage("Perfil criado com sucesso!")
                    setIsSnackbarOpen(true);
                    (document.getElementById('ProfileForm') as HTMLFormElement).reset();
                } else {
                    setSnackbarMessage("Ops... Alguma coisa deu errado.")
                    setIsSnackbarOpen(true);
                }
            } catch (error) {
                console.log(error)
            }
        }
        createProfile();
    }
    return (
        <>
            <form onSubmit={handleSubmit} method="post" id="ProfileForm">
                <div className="w-full flex gap-x-4">
                </div>
                <AutocompleteInput />
                <select
                    name="clientContact"
                    className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    defaultValue=""
                >
                    <option value="" disabled>Selecione o contato do cliente</option>
                    {clientContactData.length > 0 ? (
                        clientContactData.map((clientContact) => (
                            <option value={clientContact.id} key={clientContact.id}>{clientContact.name}</option>
                        ))
                    ) : <option value="" disabled>Você precisa cadastrar um contato.</option>}
                </select>

                <select name="position" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" required defaultValue="">
                    <option value="" disabled>Cargo</option>
                    {loadingPositions ? (<option disabled>Carregando...</option>)
                        : (
                            positions.map((position) => (
                                <option key={position.id} value={position.id}>{position.title}</option>
                            ))
                        )}
                </select>

                <select
                    name="fee"
                    className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700"
                    defaultValue=""
                >
                    <option value="" disabled>Selecione o honorário</option>
                    {clientFeeData.length > 0 ? (
                        clientFeeData.map((fee) => {
                            return <option key={fee.id} value={fee.id}>
                                {services.find(s => s.id === fee.service)?.service} -
                                {(fee.percentual && fee.value) ? `${fee.percentual}% - ${fee.value}` : (
                                    fee.percentual ? (`${fee.percentual}%`) : (`R$${fee.value}%`)
                                )} {(fee.deadline || fee.deadline !== null) ?? (`Prazo: ${fee.deadline}`)} </option>
                        })
                    ) : <option value="" disabled>Você precisa cadastrar um honorário ou cliente.</option>}
                </select>
                
                <select name="maritalStatus" defaultValue="">
                    <option value="" disabled>Selecione o estado civil</option>
                    {Object.entries(maritalStatus).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>

                <select name="educationLevel" defaultValue="">
                <option value="" disabled>Selecione o nível educacional</option>
                    {Object.entries(educationLevels).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>

                <input type="date" name="date" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Data de Criação" />

                <select name="status" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" required>
                    <option value="A">Ativo</option>
                    <option value="I">Inativo</option>
                    <option value="C">Cancelado</option>
                    <option value="S">Suspenso</option>
                </select>

                <input type="number" name="deadline" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Prazo (dias)" />

                <input type="date" name="estimatedDelivery" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Previsão de Entrega" />

                <label className="flex items-center mt-4">
                    <input type="checkbox" name="confidential" className="mr-2" /> Vaga Sigilosa
                </label>

                <input type="number" name="quantity" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Quantidade de Posições" />

                <input type="number" step="0.01" name="remuneration" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Remuneração" />

                <input type="number" step="0.01" name="serviceFee" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Valor do Serviço" />

                <input type="text" name="workSchedule" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Horário de Trabalho" />

                <input type="number" name="age" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Idade Mínima" />

                <textarea name="jobResponsibilities" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Responsabilidades da Posição"></textarea>

                <textarea name="professionalExperience" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Experiência Profissional"></textarea>


                <Button text={"Cadastrar Perfil"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>

            </form>
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </>
    )
}