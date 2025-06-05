import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SlimReportType } from "../../types/SlimReportType";
import { useEffect, useMemo, useState } from "react";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface ReportTableProps {
    parentId: number;
    reports: SlimReportType[];
}

const ReportTable = ({ parentId, reports }: ReportTableProps) => {
    const queryClient = useQueryClient();
    const columnHelper = createColumnHelper<SlimReportType>();

    const axiosClient = useAxiosClient();

    const updateStartDate = useMutation({
        mutationFn: ({ id, candidateStartDate }: { id: number; candidateStartDate: string }) =>
            axiosClient.patch(`hr/report/${id}/`, { candidateStartDate }),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['slim_profiles'] })
    })

    const updateSalary = useMutation({
        mutationFn: ({ id, agreedSalary }: { id: number; agreedSalary: number }) =>
            axiosClient.patch(`hr/report/${id}/`, { agreedSalary }),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['slim_profiles'] })
    })

    const columns = useMemo(
        () => [
            columnHelper.accessor('resumeName', {
                header: "Candidato", cell: (props) => <p>{props.getValue()}</p>
            }),
            columnHelper.accessor('positionName', {
                header: "Cargo", cell: (props) => <p>{props.getValue()}</p>
            }),
            columnHelper.accessor('agreedSalary', {
                header: "Salário",
                cell: ({ getValue, row }) => {
                    const initialValue = getValue();
                    const [salary, setSalary] = useState(initialValue);
                    
                    useEffect(() => {
                        setSalary(initialValue);
                    }, [initialValue]);

                    return (
                        <input
                            type="number"
                            step="0.01"
                            value={salary}
                            onChange={(e) => setSalary(Number(e.target.value))}
                            onBlur={() => {
                                if (salary !== initialValue) {
                                    updateSalary.mutate({
                                        id: row.original.id,
                                        agreedSalary: salary,
                                    });
                                }
                            }}
                        />
                    );
                }
            }),
            columnHelper.accessor('candidateStartDate', {
                header: "Data de início",
                cell: ({ getValue, row }) => {
                    const [value, setValue] = useState<string>(getValue());
                    
                    return (
                        <input
                            type="date"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={() => {
                                if (value !== row.original.candidateStartDate) {
                                    updateStartDate.mutate({
                                        id: row.original.id,
                                        candidateStartDate: value,
                                    });
                                }
                            }}
                        />
                    );
                }
            }),
        ], [columnHelper, updateStartDate, updateSalary]
    )

    const table = useReactTable({
        data: reports,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });


    return (
        <table className='p-4 w-full'>
            <thead className='text-xs text-stone-700 uppercase bg-stone-50 rounded'>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} scope='col' className='px-6 py-3 text-center'>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(r => (
                    <tr key={r.id}>
                        {r.getVisibleCells().map((cell) => (
                            <td key={cell.id} className='px-2 py-2'>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default ReportTable