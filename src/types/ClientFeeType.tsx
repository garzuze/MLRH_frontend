export interface ClientFeeType {
    id?: number;
    client: number;
    service: number;
    percentual: number;
    value?: number;
    deadline?: number;
}