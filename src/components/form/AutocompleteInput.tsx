import { useState, useEffect } from "react";

interface AutocompleteInputProps<T> { // T: tipo genérico
    value: string; // Valor da query
    onSelect: (item: T) => void; // Função que define o que fazer quando o dado é selecionado
    fetchResults: (query: string) => Promise<T[]>; // Busca resultados a partir do input do usuário
    getOptionLabel: (item: T) => string; // Retorna o texto do label (a partir do id)
    inputValue: string | number; // Valor que vai ficar no hidden input. ID do valor selecionado
    inputName: string; // Nome do input hidden
    placeholder?: string;
    className?: string;
    required?: boolean; // Required ser um prop é importante, principalmente para o PositionAutocompleteInput
}

const AutocompleteInput = <T extends { id: number }>({ // T precisa ter, obrigatoriamente, um id
    value,
    onSelect,
    fetchResults,
    getOptionLabel,
    inputValue,
    inputName,
    placeholder = "",
    className = "",
    required = true,
}: AutocompleteInputProps<T>) => {
    const [query, setQuery] = useState(value); // Variável para armazenar a query do usuário
    const [results, setResults] = useState<T[]>([]); //Variável para armazenar os resultados obtidos pela query
    const [selectedIndex, setSelectedIndex] = useState(-1); // Variável para acompanhar qual é o index que o usuário está selecionando
    const [isItemSelected, setIsItemSelected] = useState(false); // Variável para acompanhar quando o dado já foi selecionado, para previnir requests duplicadas


    useEffect(() => {
        if (!query || query.length < 2 || isItemSelected) {
            setResults([]); // Se a query for pequena ou inexistente, ou se o valor já tiver sido selecionado, os resultados são esvaziados
            return;
        }

        const fetchData = async () => {
            try {
                const data = await fetchResults(query); // Utiliza a função que veio dos props para buscar resultados no bd
                setResults(data);
            } catch (error) {
                console.error("Erro buscando dados:", error);
            }
        };

        const timeoutId = setTimeout(fetchData, 300); //Debouce: só faz a requisição após 300ms de inatividade. Previne queries excessivas caso o usuário digite rápido
        return () => clearTimeout(timeoutId);
    }, [query, fetchResults, isItemSelected]);

    // Função para lidar com a selação de items. Previne requests duplicadas depois que o usuário selecionar o dado
    const handleSelect = (item: T) => {
        onSelect(item);
        setQuery(getOptionLabel(item));
        setResults([]);
        setIsItemSelected(true);
    };

    // Quando value muda, significa que um item foi selecionado. Pois value é o hidden input com o id que é populado caso o usuário selecione um dado
    useEffect(() => {
        setQuery(value);
        if (value) {
            setIsItemSelected(true);
        } else {
            setIsItemSelected(false);
        }
    }, [value]);


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // Controla os dados selecionados conforme o usuário usa as setas
        // Math.min e max permite que o valor do index não seja maior ou menor do que o valor da lista
        if (event.key === "ArrowDown") {
            // Quando o usuário clicar na ↓, o indexvai de -1 para 0
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
        } else if (event.key === "ArrowUp") {
            setSelectedIndex((prev) => Math.max(prev - 1, 0))
        } else if (event.key === "Enter") {
            // Enter: usuário selecionou o dado
            event.preventDefault();
            if (results[selectedIndex] && selectedIndex >= 0) {
                handleSelect(results[selectedIndex]);
            }
        }
    }

    return (
        <div className="relative">
            <input
                type="hidden"
                name={inputName}
                value={inputValue}
            ></input>
            <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIsItemSelected(false); }} // Atualiza a query conforme o usuário digita
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`border-b border-gray-300 text-sm w-full focus:outline-none placeholder:text-stone-400 focus:border-gray-700 ${className}`}
                required={required}
            />
            {results.length > 0 && (
                <ul className="absolute w-full bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg text-sm mt-1 max-h-40 overflow-y-auto">
                    {results.map((item, index) => (
                        // Deixa uma cor mais escura caso ele seja selecionado
                        <li
                            key={item.id}
                            className={`p-2 cursor-pointer ${index === selectedIndex ? "bg-neutral-700" : ""}`} 
                            onClick={() => handleSelect(item)}
                        >
                            {getOptionLabel(item)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteInput;
