import { EducationLevelAbbreviation, GenderAbbreviation, maritalStatusAbbreviation, statusAbbreviation } from "../utils/constants";

export interface ProfileType {
    id: number;
    client: number; // cliente
    clientContact: number; // clienteContato
    position: number; // posição
    fee: number; // taxa
    strRepresentation: string; // strRepresentação
    maritalStatus: maritalStatusAbbreviation; // estado civil
    educationLevel: EducationLevelAbbreviation; // educaçãoNível
    date: string; // data
    status: statusAbbreviation; // status
    deadline: number; // prazo
    estimatedDelivery: number; // estimadoEntrega
    confidential: boolean; // confidencial
    quantity: number; // quantidade
    remuneration: number; // remuneração
    serviceFee: number; // serviçoTaxa
    workSchedule: string; // trabalhoHorário
    age: number; // idade
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
}