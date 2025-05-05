import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    createColumnHelper,
    flexRender,
    getExpandedRowModel,
    ExpandedState,
} from '@tanstack/react-table';
import { SlimResumeType } from "../../types/SlimResumeType";
import { useSlimResume } from '../../hooks/useSlimResume';
import { formatDate } from '../../utils/formatDate';
import { FiChevronDown, FiChevronRight, FiSearch } from 'react-icons/fi';
import { GetResumePDF } from './GetResumePDF';
import globalFilterFn from './globalFilterFn';
import { useNavigate } from 'react-router-dom';
export function ResumeTable() {
    const { data: resumes = [], error, isLoading } = useSlimResume();
    const columnHelper = createColumnHelper<SlimResumeType>();
    const [globalFilter, setGlobalFilter] = useState<any>([])
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const navigate = useNavigate();
    
    // const [selectedPositions, setSelectedPositions] = useState<positionType[]>([]);
    const columns = React.useMemo(
        () => [
            columnHelper.display({
                id: 'expander',
                header: '',  // no header label
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
            columnHelper.accessor('name', {
                header: "Nome", cell: (props) => <button onClick={() => navigate(`/curriculo/${props.row.original.id}`)} className='px-2 py-2 font-medium text-stone-900 whitespace-nowrap cursor-pointer hover:underline'>
                    {props.getValue()}</button>
            }),
            columnHelper.accessor('phone', { header: "Celular", cell: (props) => <p>{props.getValue()}</p> }),
            columnHelper.accessor('expectedSalary', { header: "Salário", cell: (props) => <p className='text-right'>R$ {props.getValue()}</p> }),
            columnHelper.accessor('neighborhood', { header: "Bairro", cell: (props) => <p>{props.getValue()}</p> }),
            columnHelper.accessor('city', { header: "Cidade", cell: (props) => <p>{props.getValue()}</p> }),
            columnHelper.accessor('age', { header: "Idade", cell: (props) => <p>{props.getValue()}</p> }),
            columnHelper.accessor('positionsStr', { header: "Cargo", cell: (props) => <p>{props.getValue().split("|")[0]}</p> }),
            columnHelper.accessor('updatedAt', { header: "Atualizado em", cell: (props) => <p>{formatDate(props.getValue().slice(0, 10))}</p> }),
            columnHelper.accessor('id', { header: "Ação", cell: (props) => <GetResumePDF resumeId={Number(props.getValue())} />}),
            // columnHelper.accessor((row) => row.workExperiences.map((e) => e.companyName).join(" "),{header: "empresas"}),
        ], [columnHelper])

    const table = useReactTable({
        data: resumes,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand: row => row.original.workExperiences.length > 0,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            globalFilter, expanded
        },
        onExpandedChange: setExpanded,
        globalFilterFn: globalFilterFn,
        onGlobalFilterChange: setGlobalFilter,
    })
    if (error) return <div>Erro: {error.message}</div>
    return (
        <div className='space-y-4 px-4 bg-white w-full overflow-x-auto'>
            {/* <ResumeFilters columnFilters={columnFilters} setColumnFilters={setColumnFilters} /> */}
            <div className=''>
                <div className="pb-4 bg-white grid grid-cols-3 gap-4">
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <FiSearch />
                        </div>
                        <div>
                            <fieldset>
                                <input
                                    type="text"
                                    placeholder="Pesquisar globalmente..."
                                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                                    className="block py-2 ps-10 text-sm text-stone-900 border border-stone-300 rounded-lg w-80 bg-stone-50 focus:ring-purple-500 focus:border-purple-500"
                                ></input>
                            </fieldset>
                        </div>
                    </div>
                    {/* <PositionSelector selectedPositions={selectedPositions} setSelectedPositions={setSelectedPositions} /> */}
                </div>
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
                                    <tr key={row.id} className='bg-white border-b border-stone-200 hover:bg-stone-50'>
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
                                                                Empresa
                                                            </th>
                                                            <th scope='col' className='px-6 py-3 text-center'>
                                                                Cargo
                                                            </th>
                                                            <th scope='col' className='px-6 py-3 text-center'>
                                                                Salário
                                                            </th>
                                                            <th scope='col' className='px-6 py-3 text-center'>
                                                                Período
                                                            </th>
                                                            <th scope='col' className='px-6 py-3 text-center'>
                                                                Motivo de saída
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {row.original.workExperiences.map((experience, idx) => (
                                                            <tr key={idx} className='bg-white border-b border-stone-200 hover:bg-stone-50'>
                                                                <td className='px-2 py-2 font-bold hover:underline'>
                                                                <a href={`https://www.google.com/search?q=${encodeURIComponent(experience.companyName)}`} target="_blank" rel="noopener noreferrer">{experience.companyName}</a>
                                                                </td>
                                                                <td className='px-2 py-2 text-center'>
                                                                    {experience.positionTitle}
                                                                </td>
                                                                <td className='px-2 py-2 text-right'>
                                                                    {experience.salary ? `R$ ${experience.salary}` : null}
                                                                </td>
                                                                <td className='px-2 py-2 text-center'>
                                                                    {formatDate(experience.startDate)}–
                                                                    {experience.endDate ? formatDate(experience.endDate) : 'Atual'}
                                                                </td>
                                                                <td className='px-2 py-2 text-center'>
                                                                    {experience.reasonForLeaving}
                                                                </td>
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation font-normal">
                <small className="text-sm font-normal text-stone-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">Página <small className="font-semibold text-stone-900">{table.getState().pagination.pageIndex + 1}</small> de <small className="font-semibold text-stone-900">{table.getPageCount()}</small></small>
                <div className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-stone-500 bg-white border border-stone-300 rounded-s-lg hover:bg-stone-100 hover:text-stone-700 disabled:cursor-not-allowed disabled:bg-stone-100"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >Anterior</button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="flex items-center justify-center px-3 h-8 leading-tight text-stone-500 bg-white border border-stone-300 rounded-e-lg hover:bg-stone-100 hover:text-stone-700 disabled:cursor-not-allowed disabled:bg-stone-100"
                    >
                        Próxima
                    </button>
                </div>

            </nav>
        </div>
    );

}