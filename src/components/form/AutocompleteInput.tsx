import { useState, useEffect } from "react";

interface AutocompleteInputProps<T> {
    value: string;
    onSelect: (item: T) => void;
    fetchResults: (query: string) => Promise<T[]>;
    getOptionLabel: (item: T) => string;
    inputValue: string | number;
    inputName: string;
    placeholder?: string;
    className?: string;
}

const AutocompleteInput = <T extends { id: number }>({
    value,
    onSelect,
    fetchResults,
    getOptionLabel,
    inputValue,
    inputName,
    placeholder = "",
    className = "",
}: AutocompleteInputProps<T>) => {
    const [query, setQuery] = useState(value);
    const [results, setResults] = useState<T[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isItemSelected, setIsItemSelected] = useState(false);


    useEffect(() => {
        if (!query || query.length < 2 || isItemSelected) {
            setResults([]);
            return;
        }

        const fetchData = async () => {
            try {
                const data = await fetchResults(query);
                setResults(data);
            } catch (error) {
                console.error("Erro buscando dados:", error);
            }
        };

        const timeoutId = setTimeout(fetchData, 300);
        return () => clearTimeout(timeoutId);
    }, [query, fetchResults, isItemSelected]);

    const handleSelect = (item: T) => {
        onSelect(item);
        setQuery(getOptionLabel(item));
        setResults([]);
        setIsItemSelected(true);
    };

    useEffect(() => {
        setQuery(value);
        if (value) {
            setIsItemSelected(true);
        } else {
            setIsItemSelected(false);
        }
    }, [value]);


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
            <input
                type="hidden"
                name={inputName}
                value={inputValue}
            ></input>
            <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIsItemSelected(false); }}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`border-b border-gray-300 text-sm w-full focus:outline-none placeholder:text-stone-400 focus:border-gray-700 ${className}`}
            />
            {results.length > 0 && (
                <ul className="absolute w-full bg-neutral-900 selected:bg-red-500 border border-neutral-800 text-zinc-300 rounded-lg text-sm mt-1 max-h-40 overflow-y-auto">
                    {results.map((item, index) => (
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
