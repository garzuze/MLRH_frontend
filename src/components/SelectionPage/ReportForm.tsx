import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { AxiosResponse } from "axios";
import Snackbar from "../ui/Snackbar";
import { useClient } from "../../contexts/ClientContext";
import { fetchClientContactData } from "../../services/useClientContact";
import { fetchClientFees } from "../../services/useClientFees";
import { useProfiles } from "../../hooks/useProfiles";
import ResumeSelector from "../form/ResumeAutocompleteInput";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import { ResumeType } from "../../types/ResumeType";
import { useQueryClient } from "@tanstack/react-query";
import { languageLevels, maritalStatus } from "../../utils/constants";

export default function ReportForm() {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const { data: profiles, isLoading: loadingProfiles, error: profilesError } = useProfiles(undefined, { enabled: true });


    const axiosClient = useAxiosClient();
    const queryClient = useQueryClient();
    const { client, setClient } = useClient();
    const [resume, setResume] = useState<ResumeType | null>(null);
    useEffect(() => {
        try {
            const getClientContactData = async (clientId: number) => {
                const newContactData = await fetchClientContactData(axiosClient, clientId);
                if (Array.isArray(newContactData) && newContactData.length > 0) {
                } else {
                    setSnackbarMessage("Você precisa cadastrar um contato...")
                    setIsSnackbarOpen(true)
                }
            }

            const getClientFeeData = async (clientId: number) => {
                const newFeeData = await fetchClientFees(axiosClient, clientId);
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
                const response: AxiosResponse = await axiosClient.post("/hr/report/", formData);
                if (response.status === 201) {
                    setSnackbarMessage("Parecer criado com sucesso!")
                    setIsSnackbarOpen(true);
                    queryClient.invalidateQueries({ queryKey: ['reports'] });
                    (document.getElementById('ReportForm') as HTMLFormElement).reset();
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
            <form onSubmit={handleSubmit} method="post" id="ReportForm">
                <select name="profile" defaultValue="" className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full">
                    <option value="" disabled>Selecione a vaga</option>
                    {profilesError ? <option disabled>Houve um erro</option> :
                        loadingProfiles ? (<option>Carregando...</option>) :
                            (profiles?.map((profile) => (
                                <option key={profile.id} value={profile.id}>{profile.strRepresentation}</option>
                            )))
                    }
                </select>
                <ResumeSelector selectedResume={resume} setSelectedResume={setResume} />

                <textarea name="testResult" id="testResult" className="text-sm border-b placeholder:text-stone-400 border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700" placeholder="Resultado do teste"></textarea>

                <textarea name="personalFamilyContext" id="personalFamilyContext" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700 placeholder:text-stone-400" placeholder="Contexto familiar pessoal" defaultValue={resume ? `${maritalStatus[resume.maritalStatus]} - ${resume.hasChildren ? `tem filhos de ${resume.childrenAges}` : "Não tem filhos"}` : ""}></textarea>

                <textarea name="educationalBackground" id="educationalBackground" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700 placeholder:text-stone-400" placeholder="Educação" defaultValue={resume ? `${resume.educationDetails ? `Formação:\n${resume.educationDetails}\n` : ""}${resume.additionalCourses ? `Outros cursos:\n${resume.additionalCourses}\n` : ""}${resume.computerSkills ? `Informática:\n${resume.computerSkills}\n` : ""}${resume.englishLevel > 1 ? `Nível Inglês:\n${languageLevels[resume.englishLevel]}\n`: ""}${resume.spanishLevel > 1 ? `Nível Espanhol:\n${languageLevels[resume.spanishLevel]}\n`: ""}${resume.otherLanguages ? `Outras linguas:\n${resume.otherLanguages}` : ""}` : ""}></textarea>
                
                {/* TODO: permitir alterar experiências profissionais diretamente */}
                <textarea name="professionalSummary" id="professionalSummary" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700 placeholder:text-stone-400" placeholder="Resumo profissional"></textarea>

                <textarea name="candidateProfile" id="candidateProfile" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700 placeholder:text-stone-400" placeholder="Perfil do candidato"></textarea>

                <textarea name="careerObjectives" id="careerObjectives" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700 placeholder:text-stone-400" placeholder="Objetivos de carreira" defaultValue={resume ? `Pretensão salarial: R$${resume.expectedSalary}` : ""}></textarea>

                <textarea name="finalConsiderations" id="finalConsiderations" className="text-sm border-b border-stone-300 w-full mt-4 focus:outline-none focus:border-stone-700 placeholder:text-stone-400" placeholder="Considerações finais"></textarea>

                <input name="agreedSalary" type="number" placeholder="Salário " className="text-sm placeholder:text-stone-400" />
                <br />
                <label className="text-sm text-stone-400">Data de inicio do candidato</label>
                <br />
                <input type="date" name="candidateStartDate" className="text-sm text-stone-400"></input>
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