import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Client {
    id: number;
    corporate_name: string;
}

interface ClientContextType {
    client: Client | null;
    setClient: (client: Client | null) => void;
}

const ClientContext = createContext<ClientContextType | null>(null);

export function ClientProvider({ children }: { children: ReactNode }) {
    const [client, setClient] = useState<Client | null>(null);


    return (
        <ClientContext.Provider value={{ client, setClient }}>
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