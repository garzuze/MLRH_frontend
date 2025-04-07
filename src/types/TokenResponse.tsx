export interface mlrhUser {
    id: number;
    email: string;
    cpf: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    isStaff: boolean;
    isSuperuser: boolean;
}

export interface tokenResponse {
    "refresh": string;
    "access": string;
    "user": mlrhUser
}