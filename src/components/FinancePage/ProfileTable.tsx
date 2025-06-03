import { createColumnHelper, ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { useSlimProfiles } from "../../hooks/useSlimProfiles";
import { SlimProfileType } from "../../types/SlimProfileType";
import { Fragment, useMemo, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { profileStatus, profileStatusAbbreviation } from "../../utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosClient } from "../../hooks/useAxiosClient";
import ReportTable from "./ReportTable";

const ProfileTable = () => {
    const { data: profiles = [], error, isLoading } = useSlimProfiles(null, ["A"]);
    const columnHelper = createColumnHelper<SlimProfileType>();
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const axiosClient = useAxiosClient();
    const queryClient = useQueryClient();

    const updateStatus = useMutation({
        mutationFn: ({ id, status }: { id: number; status: profileStatusAbbreviation }) =>
            axiosClient.patch(`hr/slim_profile/${id}/`, { status }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['slim_profiles'] }),
    });


    const columns = useMemo(
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
                header: "Status", cell: ({ getValue, row }) => {
                    const current = getValue();
                    return (
                        <select
                            name="status"
                            className="text-sm text-stone-400 border-b border-stone-300 mt-4 focus:outline-none focus:border-stone-700 w-full"
                            value={current}
                            onChange={(e) =>
                                updateStatus.mutate({ id: row.original.id, status: e.target.value as profileStatusAbbreviation })
                            }
                        >
                            {Object.entries(profileStatus).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    )
                }
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
                            <Fragment key={row.id}>
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
                                            <ReportTable
                                                parentId={row.original.id}
                                                reports={row.original.reports}
                                            />
                                        </td>
                                    </tr>
                                )}
                            </Fragment>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ProfileTable