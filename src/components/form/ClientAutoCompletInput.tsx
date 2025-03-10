import AutocompleteInput from "./AutocompleteInput";
import { axiosClient, axiosConfig } from "../../utils/constants";
import { ClientType } from "../../types/ClientType";

const fetchClients = async (query: string): Promise<ClientType[]> => {
    const response = await axiosClient.get(
        `clients/search_clients?q=${query}`,
        axiosConfig
    );
    return response.data;
};

const ClientSelector = ({ selectedClient, setSelectedClient }: { selectedClient: ClientType | null, setSelectedClient: (client: ClientType) => void }) => {
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
