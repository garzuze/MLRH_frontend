export interface ReceivableTitleType {
    id: number;
    document: string;
    dueDate?: string;
    amount: string;
    paymentDate?: string;
    createdAt: string;
    updatedAt: string;
    client: number;
    clientContact: number;
    reports: number[]
    strRepresentation: string;
}