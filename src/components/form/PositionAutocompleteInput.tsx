import { useState } from "react";
import AutocompleteInput from "./AutocompleteInput";
import { positionType } from "../../types/positionType";
import { useAxiosClient } from "../../hooks/useAxiosClient";

const PositionSelector = ({ selectedPositions, setSelectedPositions }: { selectedPositions: positionType[], setSelectedPositions: (positions: positionType[]) => void }) => {
    const axiosClient = useAxiosClient();

    const fetchPositions = async (query: string): Promise<positionType[]> => {
        const response = await axiosClient.get(
            `hr/search_positions?q=${query}`,
        );
        return response.data;
    };

    const addPosition = (position: positionType) => {
        if (!selectedPositions.find((pos) => pos.id === position.id)) {
            setSelectedPositions([...selectedPositions, position])
        }
    }

    const removePosition = (id: number) => {
        setSelectedPositions(selectedPositions.filter((pos) => pos.id !== id))
    }

    return (
        <div className="space-y-4">

            <AutocompleteInput<positionType>
                value={""}
                onSelect={addPosition}
                fetchResults={fetchPositions}
                getOptionLabel={(position) => position.title}
                placeholder="Buscar cargos"
                inputName="desiredPositions"
                inputValue={""}
                className="bg-neutral-900 border border-neutral-800 text-zinc-300 rounded-lg focus:ring-slate-600 focus:border-slate-600 w-full md:w-64 p-2.5"
            />

            <ul className="mt-2">
                {selectedPositions.map((position) => (
                    <li key={position.id} className="flex items-center justify-between bg-neutral-800 p-2 rounded mb-1 text-sm">
                        <span>{position.title}</span>
                        <button
                            type="button"
                            onClick={() => removePosition(position.id)}
                            className="text-sm text-red-300"
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PositionSelector;
