import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/shared/lib/shadcn/components/ui/table'
import { Button } from 'src/shared/lib/shadcn/components/ui/button.tsx'

interface PaginationOptions {
    enabled?: boolean
    pageSize?: number
    position?: 'top' | 'bottom' | 'both'
    align?: 'left' | 'center' | 'right'
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination?: PaginationOptions
}

export function SSdataTable<TData, TValue>({
    columns,
    data,
    pagination = {},
}: DataTableProps<TData, TValue>) {
    const {
        enabled = false,
        pageSize = 10,
        position = 'bottom',
        align = 'right',
    } = pagination

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        ...(enabled && { getPaginationRowModel: getPaginationRowModel() }),
        initialState: enabled
            ? {
                  pagination: { pageSize },
              }
            : {},
    })

    const renderPagination = () => {
        const justifyClass =
            align === 'center'
                ? 'justify-center'
                : align === 'left'
                  ? 'justify-start'
                  : 'justify-end'

        return (
            <div className={`flex items-center space-x-2 py-4 ${justifyClass}`}>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        )
    }

    return (
        <div>
            {enabled &&
                (position === 'top' || position === 'both') &&
                renderPagination()}

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {enabled &&
                (position === 'bottom' || position === 'both') &&
                renderPagination()}
        </div>
    )
}
