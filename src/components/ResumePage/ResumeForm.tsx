import React, { useEffect, useState } from "react";
import { cnhLevels, educationLevels, genders, languageLevels, maritalStatus, states } from "../../utils/constants";
import Button from "../ui/Button";
import { AxiosResponse } from "axios";
import Snackbar from "../ui/Snackbar";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import { ResumeFormProps } from "../../types/ResumeFormProps";
import PositionSelector from "../form/PositionAutocompleteInput";
import { positionType } from "../../types/positionType";
import { useQueryClient } from "@tanstack/react-query";
import PhoneNumberInput from "./PhoneNumberInput";
import { ResumeType } from "../../types/ResumeType";


export const ResumeForm: React.FC<ResumeFormProps> = ({ resume, user }) => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const axiosClient = useAxiosClient();
    const queryClient = useQueryClient();

    const [selectedPositions, setSelectedPositions] = useState<positionType[]>([]);

    useEffect(() => {
        async function getPositionData() {
            if (resume && resume.desiredPositions?.length) {
                try {
                    const positionPromises = resume.desiredPositions.map((positionId: number) =>
                        axiosClient.get(`hr/positions/${positionId}`)
                    );
                    const responses = await Promise.all(positionPromises);
                    const positions = responses.map((response) => response.data);
                    setSelectedPositions(positions);
                } catch (error) {
                    console.error("Erro ao buscar cargos:", error);
                }
            }
        };
        getPositionData();
    }, [resume])

    async function saveResume(payload: ResumeType) {
        const isUpdate = Boolean(resume?.id);
        const url = isUpdate ? `/hr/resume/${resume?.id}/` : '/hr/resume/';
        const method: 'patch' | 'post' = isUpdate ? 'patch' : 'post';
        try {
            const response = await axiosClient[method](url, payload);
            if ([200, 201].includes(response.status)) {
                setSnackbarMessage(isUpdate
                    ? 'Currículo atualizado com sucesso!'
                    : 'Currículo criado com sucesso!');
                queryClient.invalidateQueries({ queryKey: ['resume'] });
            }
        } catch (error) {
            setSnackbarMessage("Ops... Alguma coisa deu errado.")
        }
        setIsSnackbarOpen(true);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        const payload: ResumeType = {
            ...(data as unknown as Omit<ResumeType, 'desired_positions'>),
            desiredPositions: selectedPositions.map(p => Number(p.id))
        }

        saveResume(payload);
    }

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit} id="resumeForm">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Nome */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="name" className="mb-2 text-sm font-medium text-zinc-300">
                            Nome *
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={resume?.name}
                            required
                            placeholder="Seu nome completo"
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5 placeholder:text-sm" />
                    </div>

                    {/* CPF */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="cpf" className="mb-2 text-sm font-medium text-zinc-300">
                            CPF *
                        </label>
                        <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            defaultValue={user?.isSuperuser ? resume?.userData.cpf : user?.cpf}
                            required
                            readOnly
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Data de Nascimento */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="birthDate" className="mb-2 text-sm font-medium text-zinc-300">
                            Data de Nascimento *
                        </label>
                        <input
                            type="date"
                            name="birthDate"
                            id="birthDate"
                            defaultValue={resume?.birthDate}
                            required
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Local de Nascimento */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="birthPlace" className="mb-2 text-sm font-medium text-zinc-300">
                            Local de Nascimento *
                        </label>
                        <input
                            type="text"
                            name="birthPlace"
                            id="birthPlace"
                            defaultValue={resume?.birthPlace}
                            required
                            placeholder="Cidade - Estado"
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5 placeholder:text-sm" />
                    </div>

                    {/* Gênero */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="gender" className="mb-2 text-sm font-medium text-zinc-300">
                            Gênero *
                        </label>
                        <select
                            name="gender"
                            id="gender"
                            required
                            defaultValue={resume?.gender ? resume.gender : ""}
                            key={resume?.gender ?? 'empty'}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5"
                        >
                            <option value={""} disabled>Selecione seu gênero</option>
                            {Object.entries(genders).map(([abbr, label]) => (
                                <option key={abbr} value={abbr} >
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Estado Civil */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="maritalStatus" className="mb-2 text-sm font-medium text-zinc-300">
                            Estado Civil *
                        </label>
                        <select
                            name="maritalStatus"
                            id="maritalStatus"
                            required
                            defaultValue={resume?.maritalStatus ? resume.maritalStatus : ""}
                            key={resume?.maritalStatus ?? "empty"}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5"
                        >
                            <option value={""} disabled>Selecione seu estado civil</option>
                            {Object.entries(maritalStatus).map(([abbr, label]) => (
                                <option key={abbr} value={abbr} >
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="email" className="mb-2 text-sm font-medium text-zinc-300">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={user?.isSuperuser ? resume?.userData.email : user?.email}
                            disabled
                            readOnly
                            required
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Telefone */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="phone" className="mb-2 text-sm font-medium text-zinc-300">
                            Telefone *
                        </label>
                        {/* Uggly but works: */}
                        {/* {resume && <PhoneNumberInput defaultValue={resume.phone} />}
                        {!resume && <PhoneNumberInput />} */}
                        {/* Better: */}
                        <PhoneNumberInput name="phone" defaultValue={resume?.phone} key={resume?.phone ?? 'empty'} />
                    </div>

                    {/* Nome cônjuge */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="spouseName" className="mb-2 text-sm font-medium text-zinc-300">
                            Nome do cônjuge
                        </label>
                        <input
                            type="text"
                            name="spouseName"
                            id="spouseName"
                            placeholder="Nome completo do seu cônjugue"
                            defaultValue={resume?.spouseName}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5 placeholder:text-sm" />
                    </div>

                    {/* Profissão do cônjuge */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="spouseProfession" className="mb-2 text-sm font-medium text-zinc-300">
                            Profissão do cônjuge
                        </label>
                        <input
                            type="text"
                            name="spouseProfession"
                            id="spouseProfession"
                            defaultValue={resume?.spouseProfession}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Tem filhos? */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="hasChildren" className="mb-2 text-sm font-medium text-zinc-300">
                            Tem filhos? *
                        </label>
                        <select
                            name="hasChildren"
                            id="hasChildren"
                            required
                            defaultValue={
                                resume?.hasChildren === true
                                    ? "true"
                                    : resume?.hasChildren === false
                                        ? "false"
                                        : ""
                            }
                            key={String(resume?.hasChildren) ?? "empty"}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5"
                        >
                            <option value={""} disabled>Marque uma opção</option>
                            <option value={"true"}>Sim</option>
                            <option value={"false"}>Não</option>
                        </select>
                    </div>

                    {/* Idade dos filhos */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="childrenAges" className="mb-2 text-sm font-medium text-zinc-300">
                            Idade dos filhos
                        </label>
                        <input
                            type="text"
                            name="childrenAges"
                            id="childrenAges"
                            placeholder="X  e Y anos"
                            defaultValue={resume?.childrenAges}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5 placeholder:text-sm" />
                    </div>

                    {/* CNH */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="cnh" className="mb-2 text-sm font-medium text-zinc-300">
                            CNH
                        </label>
                        <select
                            name="cnh"
                            id="cnh"
                            defaultValue={resume?.cnh ? resume.cnh : ""}
                            key={resume?.cnh ?? "empty"}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5"
                        >
                            <option value={""} disabled>Selecione sua CNH</option>
                            {Object.entries(cnhLevels).map(([abbr, label]) => (
                                <option key={abbr} value={abbr} >
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* É fumante? */}
                    <div className="flex items-end">
                        <div className="flex items-center ps-4 border border-neutral-800 rounded-lg w-full md:w-64">
                            <input defaultChecked={resume?.isSmoker} id="isSmoker" type="checkbox" name="isSmoker" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-900" />
                            <label htmlFor="isSmoker" className="w-full py-4 ms-2 text-sm font-medium text-zinc-300">É Fumante?</label>
                        </div>
                    </div>

                    {/* Tem carro? */}
                    <div className="flex items-end">
                        <div className="flex items-center ps-4 border border-neutral-800 rounded-lg w-full md:w-64">
                            <input defaultChecked={resume?.hasCar} id="hasCar" type="checkbox" name="hasCar" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-900" />
                            <label htmlFor="hasCar" className="w-full py-4 ms-2 text-sm font-medium text-zinc-300">Tem Carro?</label>
                        </div>
                    </div>

                    {/* Tem deficiência? */}
                    <div className="flex items-end">
                        <div className="flex items-center ps-4 border border-neutral-800 rounded-lg w-full md:w-64">
                            <input defaultChecked={resume?.hasDisability} id="hasDisability" type="checkbox" name="hasDisability" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-900" />
                            <label htmlFor="hasDisability" className="w-full py-4 ms-2 text-sm font-medium text-zinc-300">Tem deficiência?</label>
                        </div>
                    </div>

                    {/* CID da deficiência   */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="disabilityCid" className="mb-2 text-sm font-medium text-zinc-300">
                            CID da deficiência
                        </label>
                        <input
                            type="text"
                            name="disabilityCid"
                            id="disabilityCid"
                            defaultValue={resume?.disabilityCid}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* CEP   */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="cep" className="mb-2 text-sm font-medium text-zinc-300">
                            CEP *
                        </label>
                        <input
                            type="text"
                            name="cep"
                            id="cep"
                            defaultValue={resume?.cep}
                            placeholder="xxxxx-xxx"
                            required
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5 placeholder:text-sm" />
                    </div>

                    {/* Endereço   */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="address" className="mb-2 text-sm font-medium text-zinc-300">
                            Endereço *
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Rua X, nº Y - Complemento Z"
                            defaultValue={resume?.address}
                            required
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5 placeholder:text-sm" />
                    </div>

                    {/* Bairro   */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="neighborhood" className="mb-2 text-sm font-medium text-zinc-300">
                            Bairro *
                        </label>
                        <input
                            type="text"
                            name="neighborhood"
                            id="neighborhood"
                            defaultValue={resume?.neighborhood}
                            required
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Cidade   */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="city" className="mb-2 text-sm font-medium text-zinc-300">
                            Cidade *
                        </label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            defaultValue={resume?.city}
                            required
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Estado */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="state" className="mb-2 text-sm font-medium text-zinc-300">
                            Estado *
                        </label>
                        <select
                            name="state"
                            id="state"
                            required
                            defaultValue={resume?.state ? resume.state : ""}
                            key={resume?.state ?? "empty"}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5"
                        >
                            <option value={""} disabled>Selecione seu estado</option>
                            {Object.entries(states).map(([abbr, label]) => (
                                <option key={abbr} value={abbr}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* LinkedIn */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="linkedin" className="mb-2 text-sm font-medium text-zinc-300">
                            LinkedIn
                        </label>
                        <input
                            type="text"
                            name="linkedin"
                            id="linkedin"
                            placeholder="Apenas link"
                            defaultValue={resume?.linkedin}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5 placeholder:text-sm" />
                    </div>

                    {/* Nível de Inglês */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="englishLevel" className="mb-2 text-sm font-medium text-zinc-300">
                            Nível de Inglês *
                        </label>
                        <select
                            name="englishLevel"
                            id="englishLevel"
                            required
                            defaultValue={resume?.englishLevel ? resume.englishLevel : ""}
                            key={resume?.englishLevel ?? "empty"}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5"
                        >
                            <option value={""} disabled>Selecione seu nível de inglês</option>
                            {Object.entries(languageLevels).map(([abbr, label]) => (
                                <option key={abbr} value={abbr} >
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nível de Espanhol */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="spanishLevel" className="mb-2 text-sm font-medium text-zinc-300">
                            Nível de Espanhol *
                        </label>
                        <select
                            name="spanishLevel"
                            id="spanishLevel"
                            required
                            defaultValue={resume?.spanishLevel ? resume.spanishLevel : ""}
                            key={resume?.spanishLevel ?? "empty"}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5"
                        >
                            <option value={""} disabled>Selecione nível de espanhol</option>
                            {Object.entries(languageLevels).map(([abbr, label]) => (
                                <option key={abbr} value={abbr} >
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Outras línguas */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="otherLanguages" className="mb-2 text-sm font-medium text-zinc-300">
                            Outras línguas
                        </label>
                        <input
                            type="text"
                            name="otherLanguages"
                            id="otherLanguages"
                            defaultValue={resume?.otherLanguages}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5" />
                    </div>

                    {/* Nível de escolaridade */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="educationLevel" className="mb-2 text-sm font-medium text-zinc-300">
                            Escolaridade *
                        </label>
                        <select
                            name="educationLevel"
                            id="educationLevel"
                            required
                            defaultValue={resume?.educationLevel ? resume.educationLevel : ""}
                            key={resume?.educationLevel ?? "empty"}
                            className="bg-neutral-900 border border-neutral-900 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5"
                        >
                            <option value={""} disabled>Selecione sua escolaridade</option>
                            {Object.entries(educationLevels).map(([abbr, label]) => (
                                <option key={abbr} value={abbr} >
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Detalhes da educação */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="educationDetails" className="mb-2 text-sm font-medium text-zinc-300">
                            Detalhes da educação
                        </label>
                        <textarea
                            id="educationDetails"
                            name="educationDetails"
                            defaultValue={resume?.educationDetails}
                            rows={4}
                            placeholder="Digite em tópicos separados por linha. Exemplo:&#10;Graduado em x na universidade y;&#10;Ensino Médio técnico em Z;"
                            className="block p-2.5 w-full text-sm text-zinc-300 bg-neutral-900 rounded-lg border border-neutral-900"
                            required></textarea>
                    </div>

                    {/* Habilidades em informática */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="computerSkills" className="mb-2 text-sm font-medium text-zinc-300">
                            Habilidades em informática
                        </label>
                        <textarea
                            id="computerSkills"
                            name="computerSkills"
                            defaultValue={resume?.computerSkills}
                            rows={4}
                            placeholder="Digite em tópicos separados por linha. Exemplo:&#10;Proficiente em Power BI;&#10;Pacote Office;"
                            className="block p-2.5 w-full text-sm text-zinc-300 bg-neutral-900 rounded-lg border border-neutral-900"></textarea>
                    </div>

                    {/* Outros cursos */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="additionalCourses" className="mb-2 text-sm font-medium text-zinc-300">
                            Outros cursos
                        </label>
                        <textarea
                            id="additionalCourses"
                            name="additionalCourses"
                            defaultValue={resume?.additionalCourses}
                            placeholder="Digite em tópicos separados por linha. Exemplo:&#10;Mecânica Básica na instituição X em ano Y;&#10;Curso do livro Python Crash Course;"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-zinc-300 bg-neutral-900 rounded-lg border border-neutral-900"></textarea>
                    </div>

                    {/* Expectativa salarial */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="expectedSalary" className="mb-2 text-sm font-medium text-zinc-300">
                            Expectativa salarial
                        </label>
                        <input
                            type="number"
                            min="500"
                            max="100000"
                            name="expectedSalary"
                            id="expectedSalary"
                            placeholder="Exemplo: 4500.00"
                            defaultValue={resume?.expectedSalary}
                            className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg
                            focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5 placeholder:text-sm" />
                    </div>

                    {/* Telefone para contato */}
                    <div className="flex flex-col items-start">
                        <label htmlFor="contactPhone" className="mb-2 text-sm font-medium text-zinc-300">
                            Telefone para contato
                        </label>
                        <PhoneNumberInput name="contactPhone" defaultValue={resume?.contactPhone} key={resume?.phone ?? 'empty'} />
                    </div>


                    <div className="space-y-2">
                        <label htmlFor="desiredPositions" className="mb-2 text-sm font-medium text-zinc-300">
                            Cargos desejados *
                        </label>
                        <PositionSelector selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} />
                    </div>

                    {/* Horário comercial? */}
                    <div className="flex items-end">
                        <div className="flex items-center ps-4 border border-neutral-800 rounded-lg w-full md:w-64">
                            <input defaultChecked={resume?.availableFullTime} id="availableFullTime" type="checkbox" name="availableFullTime" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-900" />
                            <label htmlFor="availableFullTime" className="w-full py-4 ms-2 text-sm font-medium text-zinc-300">Disponível horário comercial?</label>
                        </div>
                    </div>

                    {/* Horário manhã-tarde? */}
                    <div className="flex items-end">
                        <div className="flex items-center ps-4 border border-neutral-800 rounded-lg w-full md:w-64">
                            <input defaultChecked={resume?.availableMorningAfternoon} id="availableMorningAfternoon" type="checkbox" name="availableMorningAfternoon" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-900" />
                            <label htmlFor="availableMorningAfternoon" className="w-full py-4 ms-2 text-sm font-medium text-zinc-300">Disponível Manhã - Tarde?</label>
                        </div>
                    </div>

                    {/* Horário Tarde - Noite? */}
                    <div className="flex items-end">
                        <div className="flex items-center ps-4 border border-neutral-800 rounded-lg w-full md:w-64">
                            <input defaultChecked={resume?.availableAfternoonNight} id="availableAfternoonNight" type="checkbox" name="availableAfternoonNight" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-900" />
                            <label htmlFor="availableAfternoonNight" className="w-full py-4 ms-2 text-sm font-medium text-zinc-300">Disponível Tarde - Noite?</label>
                        </div>
                    </div>

                    {/* Horário Madrugada? */}
                    <div className="flex items-end">
                        <div className="flex items-center ps-4 border border-neutral-800 rounded-lg w-full md:w-64">
                            <input defaultChecked={resume?.availableNightShift} id="availableNightShift" type="checkbox" name="availableNightShift" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-900" />
                            <label htmlFor="availableNightShift" className="w-full py-4 ms-2 text-sm font-medium text-zinc-300">Disponível Madrugada?</label>
                        </div>
                    </div>

                    {/* Horário Escala 12x36? */}
                    <div className="flex items-end">
                        <div className="flex items-center ps-4 border border-neutral-800 rounded-lg w-full md:w-64">
                            <input defaultChecked={resume?.available1236} id="available1236" type="checkbox" name="available1236" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-900" />
                            <label htmlFor="available1236" className="w-full py-4 ms-2 text-sm font-medium text-zinc-300">Disponível Escala 12x36?</label>
                        </div>
                    </div>

                    {/* Horário Folguista? */}
                    <div className="flex items-end">
                        <div className="flex items-center ps-4 border border-neutral-800 rounded-lg w-full md:w-64">
                            <input defaultChecked={resume?.availableAsSubstitute} id="availableAsSubstitute" type="checkbox" name="availableAsSubstitute" className="w-4 h-4 text-indigo-900 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-900" />
                            <label htmlFor="availableAsSubstitute" className="w-full py-4 ms-2 text-sm font-medium text-zinc-300">Disponível Folguista?</label>
                        </div>
                    </div>
                </div>
                <Button text={Boolean(resume?.id)
                    ? 'Atualizar currículo'
                    : 'Criar currículo'} />
            </form>
            <Snackbar
                message={snackbarMessage}
                isOpen={isSnackbarOpen}
                onClose={() => setIsSnackbarOpen(false)}
            />
        </>

    );

};
