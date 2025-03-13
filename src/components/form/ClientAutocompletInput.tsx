import AutocompleteInput from "./AutocompleteInput";
import { ClientType } from "../../types/ClientType";
import { useAxiosClient } from "../../hooks/useAxiosClient";

const ClientSelector = ({ selectedClient, setSelectedClient }: { selectedClient: ClientType | null, setSelectedClient: (client: ClientType) => void }) => {
    const axiosClient = useAxiosClient();

    const fetchClients = async (query: string): Promise<ClientType[]> => {
        const response = await axiosClient.get(`clients/search_clients?q=${query}`);
        return response.data;
    };

    return (
        <AutocompleteInput<ClientType>
            value={selectedClient?.corporateName ?? ""}
            onSelect={setSelectedClient}
            fetchResults={fetchClients}
            getOptionLabel={(client) => client.corporateName}
            placeholder="Buscar clientes"
            inputName="client"
            inputValue={selectedClient?.id ?? ""}
        />
    );
};

export default ClientSelector;
