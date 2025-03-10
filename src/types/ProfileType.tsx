import { EducationLevelAbbreviation, GenderAbbreviation, maritalStatusAbbreviation, statusAbbreviation } from "../utils/constants";

export interface ProfileType {
    id: number;
    client: number;
    clientContact: number;
    position: number;
    fee: number;
    strRepresentation: string;
    maritalStatus: maritalStatusAbbreviation;
    educationLevel: EducationLevelAbbreviation;
    date: string;
    status: statusAbbreviation;
    deadline: number;
    estimatedDelivery: number;
    confidential: boolean;
    quantity: number;
    remuneration: number;
    serviceFee: number;
    workSchedule: string;
    age: number;
    gender: GenderAbbreviation;
    jobResponsibilities: string;
    professionalExperience: string;
    titleGenerated: boolean;
    computerSkills: string;
    languages: string;
    behavioralProfile: string;
    workEnvironment: string;
    additionalNotes: string;
    restrictions: string;
    cancellationReason: string;
}