import { EducationLevelAbbreviation, GenderAbbreviation, maritalStatusAbbreviation, profileStatusAbbreviation } from "../utils/constants";

export interface ProfileType {
    id: number;
    client: number; // cliente
    clientContact: number; // clienteContato
    position: number; // posição
    positionStr: string;
    fee: number; // taxa
    location: string;
    maritalStatus: maritalStatusAbbreviation; // estado civil
    educationLevel: EducationLevelAbbreviation; // educaçãoNível
    date: string; // data
    status: profileStatusAbbreviation; // status
    deadline: number; // prazo
    estimatedDelivery: number; // estimadoEntrega
    confidential: boolean; // confidencial
    quantity: number; // quantidade
    remuneration: number; // remuneração
    serviceFee: number; // serviçoTaxa
    workSchedule: string; // trabalhoHorário
    age: number; // idade
    benefits: string[];
    gender: GenderAbbreviation; // gênero
    jobResponsibilities: string; // empregoResponsabilidades
    professionalExperience: string; // profissionalExperiência
    titleGenerated: boolean; // títuloGerado
    computerSkills: string; // computadorHabilidades
    languages: string; // idiomas
    behavioralProfile: string; // comportamentalPerfil
    workEnvironment: string; // trabalhoAmbiente
    additionalNotes: string; // adicionalNotas
    restrictions: string; // restrições
    cancellationReason: string; // cancelamentoMotivo
    createdAt: string;
    updateAt: string;
}