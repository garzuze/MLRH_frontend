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
import { useProfiles } from "../../services/useProfiles";
import ResumeSelector from "../form/ResumeAutocompleteInput";
import { ResumeType } from "../../types/ResumeType";

export default function ClientForm() {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const { profiles, loadingProfiles } = useProfiles();

    const { client, setClient } = useClient();
    const [resume, setResume] = useState<ResumeType | null>(null);



    useEffect(() => {
        try {
            const getClientContactData = async (clientId: number) => {
                const newContactData = await fetchClientContactData(clientId);
                if (Array.isArray(newContactData) && newContactData.length > 0) {
                } else {
                    setSnackbarMessage("Você precisa cadastrar um contato...")
                    setIsSnackbarOpen(true)
                }
            }

            const getClientFeeData = async (clientId: number) => {
                const newFeeData = await fetchClientFees(clientId);
                if (Array.isArray(newFeeData) && newFeeData.length > 0) {
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

        const createReport = async () => {
            try {
                const response: AxiosResponse = await axiosClient.post("/hr/report/", formData, axiosConfig);
                if (response.status === 201) {
                    setSnackbarMessage("Parecer criado com sucesso!")
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
        createReport();
    }
    return (
        <>
            <form onSubmit={handleSubmit} method="post" id="ProfileForm">
                <select name="profile" defaultValue="">
                    <option value="" disabled>Selecione a vaga</option>
                    {loadingProfiles ? (<option>Carregando...</option>) :
                        (profiles.map((profile) => (
                            <option key={profile.id} value={profile.id}>{profile.strRepresentation}</option>
                        )))
                    }
                </select>
                <ResumeSelector selectedResume={resume} setSelectedResume={setResume} />
                
                <textarea name="testResult" id="testResult" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Resultado do teste"></textarea>
                
                <textarea name="personalFamilyContext" id="personalFamilyContext" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Contexto familiar pessoal"></textarea>
                
                <textarea name="educationalBackground" id="educationalBackground" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Educação">{resume?.educationDetails}</textarea>
                
                <textarea name="professionalSummary" id="professionalSummary" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Resumo profissional"></textarea>
                
                <textarea name="candidateProfile" id="candidateProfile" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Perfil do candidato"></textarea>
                
                <textarea name="careerObjectives" id="careerObjectives" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Objetivos de carreira"></textarea>
                
                <textarea name="finalConsiderations" id="finalConsiderations" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Considerações finais"></textarea>
                
                <input name="agreedSalary" type="number" placeholder="Salário " />
                
                <label>Data de inicio do candidato</label>
                <input type="date" name="candidateStartDate"></input>
                <Button text={"Cadastrar Parecer"} variant="dark" className="w-full mx-0 p-2 text-sm mt-4"></Button>

            </form>
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </>
    )
}