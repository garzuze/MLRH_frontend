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
import { ResumeSearchInput } from './ResumeSearchInput';
import { ColumnFilter } from '../../types/ColumnFilter';
import { FiSearch } from 'react-icons/fi';
import { GetResumePDF } from './GetResumePDF';
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
            collumnHelper.accessor('id', {header: "Ação", cell: (props)=> <GetResumePDF resumeId={Number(props.getValue())} />}),
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
        <div className='space-y-4 px-4 bg-white'>
            {/* <ResumeFilters columnFilters={columnFilters} setColumnFilters={setColumnFilters} /> */}
            <div className=''>
                <div className="pb-4 bg-white">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <FiSearch />
                        </div>
                        <ResumeSearchInput columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                    </div>
                </div>
                <div className='rounded shadow-md relative x-auto'>
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
            </div>
            {/* <div>
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
            </div> */}
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation font-normal">
                <small className="text-sm font-normal text-stone-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">Página <small className="font-semibold text-stone-900">{table.getState().pagination.pageIndex + 1}</small> de <small className="font-semibold text-stone-900">{table.getPageCount()}</small></small>
                <div className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-stone-500 bg-white border border-stone-300 rounded-s-lg hover:bg-stone-100 hover:text-stone-700"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >Anterior</button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-stone-500 bg-white border border-stone-300 rounded-e-lg hover:bg-stone-100 hover:text-stone-700"
                    >
                        Próxima
                    </button>
                </div>

            </nav>
        </div>
    );

}