export interface ClientType{
    id: number;
    cep?: string;
    city: string;
    state: string;
    address: string;
    cnpj: string;
    neighborhood: string;
    corporateName: string;
    tradeName: string;
    numberOfEmployees?: number;
    stateRegistration?: string;
    economicActivity: number;
    benefits: number[];
}