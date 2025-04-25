import { ColumnFilter } from "./ColumnFilter";

export const ResumeFilters = ({ columnFilters, setColumnFilters }: { columnFilters: ColumnFilter[], setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>> }) => {
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
            ></input>
        </fieldset>
    )
}