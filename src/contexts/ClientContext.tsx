import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Client {
    id: number;
    corporateName: string;
}

interface ClientContextType {
    client: Client | null;
    setClient: (client: Client | null) => void;
    proposalComponent: boolean;
    setProposalComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClientContext = createContext<ClientContextType | null>(null);

export function ClientProvider({ children }: { children: ReactNode }) {
    const [client, setClient] = useState<Client | null>(null);
    const [proposalComponent, setProposalComponent] = useState<boolean>(false);

    return (
        <ClientContext.Provider value={{ client, setClient, proposalComponent, setProposalComponent }}>
            {children}
        </ClientContext.Provider>
    )
}

export function useClient() {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error("useClient deve ser usado em ClientProvider!")
    }
    return context;
}