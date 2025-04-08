import { useState } from "react";
import Button from "../ui/Button";
import { AxiosResponse } from "axios";
import Snackbar from "../ui/Snackbar";
import { useProfiles } from "../../hooks/useProfiles";
import ResumeSelector from "../form/ResumeAutocompleteInput";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import { ResumeType } from "../../types/ResumeType";
import { useQueryClient } from "@tanstack/react-query";
import { languageLevels, maritalStatus } from "../../utils/constants";
import { useClientMlrh } from "../../hooks/useClientMlrh";
import ReportTextarea from "./ReportTextarea";

export default function ReportForm() {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const { data: profiles, isLoading: loadingProfiles, error: profilesError } = useProfiles(undefined, { enabled: true });
    // Retorna os IDs dos clientes de todos os perfis
    const clientsIds = profiles?.map((profile) => (profile.client)) || [];
    // Endpoint de clientes suporta vários ids em uma request só e isso é muito legal 😎
    const { data: clients, isLoading: loadingClients } = useClientMlrh(clientsIds, { enabled: clientsIds.length > 0 });

    const axiosClient = useAxiosClient();
    const queryClient = useQueryClient();
    const [resume, setResume] = useState<ResumeType | null>(null);

    async function createReport(formData: FormData) {
        const response: AxiosResponse = await axiosClient.post("/hr/report/", formData);
        if (response.status === 201) {
            setSnackbarMessage("Parecer criado com sucesso!")
            // Recarrega os pareceres na lista ao lado
            queryClient.invalidateQueries({ queryKey: ['reports'] });
            // Limpa o formulário
            (document.getElementById('ReportForm') as HTMLFormElement).reset();
        } else {
            setSnackbarMessage("Ops... Alguma coisa deu errado.")
        }
        setIsSnackbarOpen(true);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        createReport(formData);
    }

    const textareas = [
        {
            name: "testResult",
            placeholder: "Resultado do teste"
        },
        {
            name: "personalFamilyContext",
            placeholder: "Contexto familiar pessoal",
            defaultValue: resume ? `${maritalStatus[resume.maritalStatus]} - ${resume.hasChildren ? `tem filhos de ${resume.childrenAges}` : "Não tem filhos"}` : "",
        },
        {
            name: "educationalBackground",
            placeholder: "Educação",
            defaultValue: resume ? `${resume.educationDetails ? `Formação:\n${resume.educationDetails}\n` : ""}${resume.additionalCourses ? `Outros cursos:\n${resume.additionalCourses}\n` : ""}${resume.computerSkills ? `Informática:\n${resume.computerSkills}\n` : ""}${resume.englishLevel > 1 && `Nível Inglês:\n${languageLevels[resume.englishLevel]}\n`}${resume.spanishLevel > 1 && `Nível Espanhol:\n${languageLevels[resume.spanishLevel]}\n`}${resume.otherLanguages && `Outras linguas:\n${resume.otherLanguages}`}` : "",
        },
        {
            name: "professionalSummary",
            placeholder: "Resumo profissional"
        },
        {
            name: "candidateProfile",
            placeholder: "Perfil do candidato"
        },
        {
            name: "careerObjectives",
            placeholder: "Objetivos de carreira",
            defaultValue: resume ? `Pretensão salarial: R$${resume.expectedSalary}` : ""
        },
        {
            name: "finalConsiderations",
            placeholder: "Considerações finais"
        },
    ]

    return (
        <>
            <form onSubmit={handleSubmit} method="post" id="ReportForm">
                <select
                    name="profile"
                    defaultValue=""
                    className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full"
                >
                    <option value="" disabled>Selecione a vaga</option>
                    {profilesError ? <option disabled>Houve um erro</option> :
                        loadingProfiles || loadingClients ? (<option>Carregando...</option>) :
                            profiles?.map((profile) => {
                                const client = clients?.find(client => client.id === profile.client);
                                return (
                                    <option key={profile.id} value={profile.id}>{profile.positionStr} - {client?.tradeName ?? "Carregando..."}</option>
                                );
                            })
                    }
                </select>
                <ResumeSelector selectedResume={resume} setSelectedResume={setResume} />

                {textareas.map((input) => {
                    return (
                        <ReportTextarea key={input.name} name={input.name} placeholder={input.placeholder} defaultValue={input.defaultValue}
                        />
                    )
                })}

                <input
                    name="agreedSalary"
                    type="number"
                    placeholder="Salário "
                    className="text-sm placeholder:text-stone-400" />
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