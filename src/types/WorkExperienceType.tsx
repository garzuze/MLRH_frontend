export interface WorkExperienceType {
    id: number;
    companyName: string;
    positionTitle: string;
    startDate: string;
    endDate?: string;
    salary?: string;
    responsibilities: string;
    reasonForLeaving: string;
}