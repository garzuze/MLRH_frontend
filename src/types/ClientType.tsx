export interface ClientType{
    id: number;
    cep?: string;
    city: string;
    state: string;
    address: string;
    cnpj: string;
    neighborhood: string;
    corporate_name: string;
    trade_name: string;
    number_of_employees?: number;
    state_registration?: string;
    economic_activity: number;
    benefits: number[];
}