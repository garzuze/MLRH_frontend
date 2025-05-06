export interface WorkExperienceType {
    id: number;
    resume: number;
    companyName: string; // Nome da empresa
    positionTitle: string; // Cargo
    startDate: string; // Data de início
    endDate?: string; // Data de término
    salary?: string; // Salário
    responsibilities: string; // Responsabilidades
    reasonForLeaving: string; // Motivo da saída
}