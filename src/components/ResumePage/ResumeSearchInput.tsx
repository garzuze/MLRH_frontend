import { ColumnFilter } from "../../types/ColumnFilter";

export const ResumeSearchInput = ({ columnFilters, setColumnFilters }: { columnFilters: ColumnFilter[], setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>> }) => {
    const resumeName = columnFilters?.find((f) => f.id === "name")?.value || "";

    const onFilterChange = (id: string, value: string) => setColumnFilters(
        prev => prev.filter(f => f.id !== id).concat({
            id, value
        })
    )

    return (
        <fieldset>
            <input
                type="text"
                placeholder="Pesquisar nome..."
                value={resumeName}
                onChange={(e) => onFilterChange("name", e.target.value)}
                className="block py-2 ps-10 text-sm text-stone-900 border border-stone-300 rounded-lg w-80 bg-stone-50 focus:ring-purple-500 focus:border-purple-500"
            ></input>
        </fieldset>
    )
}