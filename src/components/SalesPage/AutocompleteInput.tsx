import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useClient } from "../../contexts/ClientContext";
import { axiosClient, axiosConfig } from "../../utils/constants";

interface Client {
    id: number;
    corporateName: string;
}

const AutocompleteInput = () => {
    const [query, setQuery] = useState("");
    const { client, setClient } = useClient();
    const [results, setResults] = useState<Client[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const { token } = useAuth();

    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return;
        }

        const fetchClients = async () => {
            if (!query || client) return;
            try {
                const response = await axiosClient.get(`clients/search_clients?q=${query}`, axiosConfig)
                setResults(response.data);
            } catch (error) {
                console.error("Deu ruim: ", error)
            }

        };

        // Só fazer a requisição após 300ms depois que o usuário digitou
        const timeoutId = setTimeout(fetchClients, 300)
        return () => clearTimeout(timeoutId)
    }, [query])

    const handleSelect = (client: Client) => {
        setClient(client);
        setQuery(client.corporateName);
        setResults([]);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
        } else if (event.key === "ArrowUp") {
            setSelectedIndex((prev) => Math.min(prev - 1, 0))
        } else if (event.key === "Enter") {
            event.preventDefault();
            if (results[selectedIndex] && selectedIndex >= 0) {
                handleSelect(results[selectedIndex]);
            }
        }
    }

    return (
        <div className="relative">
            <input type="hidden" name="client" id="clientId" value={client?.id ?? ""}></input>
            <input
                type="text"
                value={client?.corporateName}
                onChange={(e) => { setQuery(e.target.value);  setClient(null)}}
                onKeyDown={handleKeyDown}
                placeholder="Cliente"
                className="placeholder:text-sm text-sm border-b border-stone-300 w-full focus:outline-none focus:border-stone-700"
                required
            />
            {results.length > 0 && (
                <ul className="absolute w-full border border-stone-300 bg-white rounded text-xs mt-1 max-h-40 overflow-y-auto">
                    {results.map((client, index) => (
                        <li
                            key={client.id}
                            className={`p-2 cursor-pointer ${index === selectedIndex ? "bg-stone-200" : ""}`}
                            onClick={() => {
                                setQuery(client.corporateName); setResults([]); handleSelect(client)
                            }}
                        >
                            {client.corporateName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AutocompleteInput;