import React, { useEffect, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    createColumnHelper,
    flexRender,
} from '@tanstack/react-table';
import { SlimResumeType } from "../../types/SlimResumeType";
import { useSlimResume } from '../../hooks/useSlimResume';
import { formatDate } from '../../utils/formatDate';
export function ResumeTable() {
    const { data: resumes = [], error, isLoading } = useSlimResume();

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
        getPaginationRowModel: getPaginationRowModel(),
    })
    if (isLoading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error.message}</div>
    return (
        <div>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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