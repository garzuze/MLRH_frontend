import { AxiosResponse } from "axios";
import React, { useState } from "react";
import Button from "../ui/Button";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import Snackbar from "../ui/Snackbar";
import { WorkExperienceType } from "../../types/WorkExperienceType";
import { useQueryClient } from "@tanstack/react-query";

interface WorkExperienceFormProps {
    experience?: WorkExperienceType;
    resumeId: number;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ experience, resumeId }) => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const axiosClient = useAxiosClient();
    const queryClient = useQueryClient();

    async function saveWorkExperience(payload: WorkExperienceType) {
        const isUpdate = Boolean(experience?.resume);
        const url = isUpdate ? `/hr/work_experience/${experience?.id}/` : '/hr/work_experience/';
        const method: 'patch' | 'post' = isUpdate ? 'patch' : 'post';
        try {
            const response = await axiosClient[method](url, payload);
            if ([200, 201].includes(response.status)) {
                setSnackbarMessage(isUpdate
                    ? 'Experiência atualizada com sucesso!'
                    : 'Experiência criada com sucesso!');
                queryClient.invalidateQueries({ queryKey: ['workExperiences'] });
            }
            (document.getElementById('WorkExperienceForm') as HTMLFormElement).reset();
        } catch (error) {
            setSnackbarMessage("Ops... Alguma coisa deu errado.")
        }
        setIsSnackbarOpen(true);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(Array.from(formData.entries()).filter(
            ([_, value]) => value !== ""
        ));
        const payload: WorkExperienceType = {
            ...(data as unknown as Omit<WorkExperienceType, 'resume'>),
            resume: resumeId,
        }
        saveWorkExperience(payload);
    }

    return (
        <div className="w-full bg-neutral-950 border border-neutral-800 rounded-lg shadow md:mt-0 md text-zinc-50 p-4 xl:max-w-screen-xl mx-auto mb-6">
            <form className="space-y-6" onSubmit={handleSubmit} id="WorkExperienceForm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {/* Nome da empresa */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="companyName" className="mb-2 text-sm font-medium text-zinc-300">
                            Empresa
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            defaultValue={experience?.companyName}
                            id="companyName"
                            required
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Cargo */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="positionTitle" className="mb-2 text-sm font-medium text-zinc-300">
                            Cargo
                        </label>
                        <input
                            type="text"
                            name="positionTitle"
                            defaultValue={experience?.positionTitle}
                            id="positionTitle"
                            required
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Data de início */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="startDate" className="mb-2 text-sm font-medium text-zinc-300">
                            Data de Início
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            defaultValue={experience?.startDate}
                            id="startDate"
                            required
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Data de fim */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="endDate" className="mb-2 text-sm font-medium text-zinc-300">
                            Data de fim
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            defaultValue={experience?.endDate}
                            id="endDate"
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Salário */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="salary" className="mb-2 text-sm font-medium text-zinc-300">
                            Salário
                        </label>
                        <input
                            type="number"
                            name="salary"
                            defaultValue={experience?.salary}
                            id="salary"
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Responsabilidades */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="responsibilities" className="mb-2 text-sm font-medium text-zinc-300">
                            Responsabilidades
                        </label>
                        <textarea id="responsibilities" name="responsibilities"
                            defaultValue={experience?.responsibilities} rows={4} className="block p-2.5 w-full text-sm text-zinc-300 bg-neutral-900 rounded-lg border border-neutral-900" required></textarea>
                    </div>

                    {/* Razão de saída */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="reasonForLeaving" className="mb-2 text-sm font-medium text-zinc-300">
                            Motivo de saída
                        </label>
                        <input
                            type="text"
                            name="reasonForLeaving"
                            defaultValue={experience?.reasonForLeaving}
                            id="reasonForLeaving"
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>
                </div>
                <Button text={Boolean(experience?.id)
                    ? 'Atualizar Experiência'
                    : 'Cadastrar Experiência'} className="w-64" />
                <Snackbar
                    message={snackbarMessage}
                    isOpen={isSnackbarOpen}
                    onClose={() => setIsSnackbarOpen(false)}
                />
            </form>
        </div>
    )
}