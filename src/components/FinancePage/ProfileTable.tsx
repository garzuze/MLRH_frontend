import { createColumnHelper, ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { useSlimProfiles } from "../../hooks/useSlimProfiles";
import { SlimProfileType } from "../../types/SlimProfileType";
import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { status } from "../../utils/constants";
import React from "react";
import { formatDate } from "../../utils/formatDate";

const ProfileTable = () => {
    const { data: profiles = [], error, isLoading } = useSlimProfiles();
    const columnHelper = createColumnHelper<SlimProfileType>();
    const [expanded, setExpanded] = useState<ExpandedState>({});

    const columns = React.useMemo(
        () => [
            columnHelper.display({
                id: 'expander',
                header: '',
                cell: ({ row }) =>
                    row.getCanExpand() ? (
                        <button
                            onClick={row.getToggleExpandedHandler()}
                            className='cursor-pointer mx-auto w-full'
                        >
                            {row.getIsExpanded() ? <FiChevronDown size={24} /> : <FiChevronRight size={24} />}
                        </button>
                    ) : null,
            }),
            columnHelper.accessor('clientName', {
                header: "Cliente", cell: (props) => <p>{props.getValue()}</p>
            }),
            columnHelper.accessor('clientContact', {
                header: "Contato", cell: (props) => <p>{props.getValue()}</p>
            }),
            columnHelper.accessor('positionName', {
                header: "Cargo", cell: (props) => <p>{props.getValue()}</p>
            }),
            columnHelper.accessor('status', {
                header: "Status", cell: (props) => <p>{status[props.getValue()]}</p>
            })
        ], [columnHelper]
    )

    const table = useReactTable({
        data: profiles,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: row => row.original.reports.length > 0,
        state: { expanded },
        onExpandedChange: setExpanded,
    })

    if (error) return <div>Erro: {error.message}</div>
    if (isLoading) return <div>Carregando...</div>


    return (
        <div className='bg-white w-full overflow-x-auto'>
            <div className='rounded shadow-md mx-auto'>
                <table className='w-full text-sm text-left text-stone-500'>
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
                        {table.getRowModel().rows.map((row) => (
                            <React.Fragment key={row.id}>
                                <tr key={row.id} className='bg-white border-b border-stone-200 hover:bg-stone-100 odd:bg-white even:bg-stone-50'>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id} className='px-2 py-2'>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        )
                                    })}
                                </tr>
                                {row.getIsExpanded() && (
                                    <tr>
                                        <td colSpan={columns.length} className='pl-10 bg-stone-50'>
                                            <table className='p-4 w-full'>
                                                <thead className='text-xs text-stone-700 uppercase bg-stone-50 rounded'>
                                                    <tr>
                                                        <th scope='col' className='px-6 py-3 text-center'>
                                                            Nome
                                                        </th>
                                                        <th scope='col' className='px-6 py-3 text-center'>
                                                            Cargo
                                                        </th>
                                                        <th scope='col' className='px-6 py-3 text-center'>
                                                            Salário
                                                        </th>
                                                        <th scope='col' className='px-6 py-3 text-center'>
                                                            Data de início
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {row.original.reports.map((report, idx) => (
                                                        <tr key={idx} className='bg-white border-b border-stone-200 hover:bg-stone-50'>
                                                            <td className='px-2 py-2 font-bold'>
                                                                {report.resumeName}
                                                            </td>
                                                            <td className='px-2 py-2 text-center'>
                                                                {report.positionName}
                                                            </td>
                                                            <td className='px-2 py-2 text-right'>
                                                                {report.agreedSalary ? `R$ ${report.agreedSalary}` : null}
                                                            </td>
                                                            <td className='px-2 py-2 text-center'>
                                                                {report.candidateStartDate ? formatDate(report.candidateStartDate) : null}
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ProfileTable