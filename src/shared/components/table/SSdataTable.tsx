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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from 'src/shared/lib/shadcn/components/ui/pagination'

interface PaginationOptions {
    enabled?: boolean
    pageSize?: number
    position?: 'top' | 'bottom' | 'both'
    align?: 'left' | 'center' | 'right'
    showPageNumbers?: boolean
    maxVisiblePages?: number
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
        showPageNumbers = true,
        maxVisiblePages = 5,
    } = pagination

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: enabled ? pageSize : data.length || 1000000,
                pageIndex: 0
            },
        },
    })

    const generatePageNumbers = () => {
        if (!showPageNumbers) return []

        const currentPage = table.getState().pagination.pageIndex + 1
        const totalPages = table.getPageCount()

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        const sidePages = Math.floor(maxVisiblePages / 2)
        let startPage = Math.max(1, currentPage - sidePages)
        let endPage = Math.min(totalPages, currentPage + sidePages)

        // 시작 부분 조정
        if (endPage - startPage + 1 < maxVisiblePages) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
            } else {
                startPage = Math.max(1, endPage - maxVisiblePages + 1)
            }
        }

        const pages = []
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        return pages
    }

    const renderPagination = () => {
        const justifyClass =
            align === 'center'
                ? 'justify-center'
                : align === 'left'
                    ? 'justify-start'
                    : 'justify-end'

        const currentPage = table.getState().pagination.pageIndex + 1
        const totalPages = table.getPageCount()
        const pageNumbers = generatePageNumbers()

        return (
            <div className={`flex items-center py-4 ${justifyClass}`}>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => table.previousPage()}
                                className={!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>

                        {showPageNumbers && (
                            <>
                                {/* 첫 페이지와 ellipsis */}
                                {pageNumbers[0] > 1 && (
                                    <>
                                        <PaginationItem>
                                            <PaginationLink
                                                onClick={() => table.setPageIndex(0)}
                                                isActive={currentPage === 1}
                                                className="cursor-pointer"
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        {pageNumbers[0] > 2 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}
                                    </>
                                )}

                                {/* 페이지 번호들 */}
                                {pageNumbers.map((pageNum) => (
                                    <PaginationItem key={pageNum}>
                                        <PaginationLink
                                            onClick={() => table.setPageIndex(pageNum - 1)}
                                            isActive={currentPage === pageNum}
                                            className="cursor-pointer"
                                        >
                                            {pageNum}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {/* 마지막 페이지와 ellipsis */}
                                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                                    <>
                                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                                            <PaginationItem>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        )}
                                        <PaginationItem>
                                            <PaginationLink
                                                onClick={() => table.setPageIndex(totalPages - 1)}
                                                isActive={currentPage === totalPages}
                                                className="cursor-pointer"
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    </>
                                )}
                            </>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => table.nextPage()}
                                className={!table.getCanNextPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        )
    }

    return (
        <div>
            {enabled &&
                (position === 'top' || position === 'both') &&
                renderPagination()}

            <div className="overflow-hidden rounded-md border">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="truncate"
                                        style={{
                                            width: header.getSize() !== 150 ? `${header.getSize()}px` : `${100 / headerGroup.headers.length}%`
                                        }}
                                    >
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
                                        <TableCell
                                            key={cell.id}
                                            className="truncate"
                                        >
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