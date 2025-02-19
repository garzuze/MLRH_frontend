import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { useAuth } from "../../context/AuthContext";

interface Client {
    id: number;
    corporate_name: string;
}

const AutocompleteInput = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Client[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isSelecting, setIsSelecting] = useState(false);

    const { token } = useAuth();

    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return;
        }

        const fetchClients = async () => {
            if (!query || isSelecting) return;
            const config: AxiosRequestConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                } as RawAxiosRequestHeaders
            };
            
            try {
                const response = await axios.get(`http://127.0.0.1:8000/clients/search_clients?q=${query}`, config)
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
        setIsSelecting(true);
        setQuery(client.corporate_name);
        setResults([]);
        setTimeout(() => {
            setIsSelecting(false)
        }, 100);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
        } else if (event.key === "ArrowUp") {
            setSelectedIndex((prev) => Math.min(prev - 1, 0))
        } else if (event.key === "Enter" && selectedIndex >= 0) {
            if (results.length > 0) {
                handleSelect(results[0]);
            }
        }
    }

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Cliente"
                className="placeholder:text-sm text-sm border-b border-stone-300 w-full focus:outline-none focus:border-stone-700"
            />
            {results.length > 0 && (
                <ul className="absolute w-full border border-stone-300 bg-white rounded text-xs mt-1 max-h-40 overflow-y-auto">
                    {results.map((client, index) => (
                        <li
                            key={client.id}
                            className={`p-2 cursor-pointer ${index === selectedIndex ? "bg-stone-200" : ""}`}
                            onClick={() => { setQuery(client.corporate_name); setResults([]) }}
                        >
                            {client.corporate_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AutocompleteInput;