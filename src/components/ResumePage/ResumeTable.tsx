import React, { useEffect, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    createColumnHelper,
    flexRender,
    ColumnFiltersState,
} from '@tanstack/react-table';
import { SlimResumeType } from "../../types/SlimResumeType";
import { useSlimResume } from '../../hooks/useSlimResume';
import { formatDate } from '../../utils/formatDate';
import { ResumeFilters } from './ResumeFilters';
import { ColumnFilter } from './ColumnFilter';
export function ResumeTable() {
    const { data: resumes = [], error, isLoading } = useSlimResume();
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const collumnHelper = createColumnHelper<SlimResumeType>();
    const collums = React.useMemo(
        () => [
            collumnHelper.accessor('name', { header: "Nome", cell: (props) => <p>{props.getValue()}</p> }),
            collumnHelper.accessor('phone', { header: "Celular", cell: (props) => <p>{props.getValue()}</p> }),
            collumnHelper.accessor('expectedSalary', { header: "Salário", cell: (props) => <p>R$ {props.getValue()}</p> }),
            collumnHelper.accessor('neighborhood', { header: "Bairro", cell: (props) => <p>{props.getValue()}</p> }),
            collumnHelper.accessor('city', { header: "Cidade", cell: (props) => <p>{props.getValue()}</p> }),
            collumnHelper.accessor('age', { header: "Idade", cell: (props) => <p>{props.getValue()}</p> }),
            collumnHelper.accessor('positionsStr', { header: "Cargo", cell: (props) => <p>{props.getValue().split("|")[0]}</p> }),
            collumnHelper.accessor('updatedAt', { header: "Atualizado em", cell: (props) => <p>{formatDate(props.getValue().slice(0, 10))}</p> }),
        ], [collumnHelper])

    const table = useReactTable({
        data: resumes,
        columns: collums,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            columnFilters
        },
    })
    if (error) return <div>Erro: {error.message}</div>
    return (
        <div className='space-y-4'>
            <ResumeFilters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                <table className='w-full text-sm text-left text-stone-500 rounded'>
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
                            <tr key={row.id} className='bg-white border-b border-stone-200 hover:bg-stone-50'>
                                {row.getVisibleCells().length > 0 ? (
                                    row.getVisibleCells().map((cell) => {
                                        return (
                                            <td {...{
                                                key: cell.id,
                                                className: cell.id.endsWith('name') ? 'px-2 py-2 font-medium text-stone-900 whitespace-nowrap' : 'px-2 py-2',

                                            }}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        )
                                    })) : "Não há registros"
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <p>
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </p>
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"| <"}
                </button>
                {" | "}
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    {" > |"}
                </button>
            </div>
        </div>
    );

}