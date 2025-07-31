import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
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
import { ScrollArea } from 'src/shared/lib/shadcn/components/ui/scroll-area'
import { useRef, useEffect, useState } from 'react'

interface PaginationOptions {
    enabled?: boolean
    pageSize?: number
    position?: 'top' | 'bottom' | 'both'
    align?: 'left' | 'center' | 'right'
    showPageNumbers?: boolean
    maxVisiblePages?: number
}

interface VirtualizationOptions {
    enabled?: boolean
    rowHeight?: number
    containerHeight?: number
    overscan?: number
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination?: PaginationOptions
    virtualization?: VirtualizationOptions
}

export function SSdataTable<TData, TValue>({
                                               columns,
                                               data,
                                               pagination = {},
                                               virtualization = {},
                                           }: DataTableProps<TData, TValue>) {
    const {
        enabled: paginationEnabled = false, // 페이지네이션 활성화 여부 (기본값: false)
        pageSize = 10, // 페이지당 표시할 행 개수 (기본값: 10)
        position = 'bottom', // 페이지네이션 위치 (기본값: 하단)
        align = 'right', // 페이지네이션 정렬 방향 (기본값: 우측 정렬)
        showPageNumbers = true, // 페이지 번호 표시 여부 (기본값: true)
        maxVisiblePages = 5, // 최대 표시할 페이지 번호 개수 (기본값: 5)
    } = pagination // pagination 객체에서 옵션들을 추출

    const {
        enabled: virtualEnabled = !paginationEnabled, // 가상화 활성화 여부 (기본값: 페이지네이션이 비활성화일 때 true)
        rowHeight = 52, // 각 행의 높이 (기본값: 52px)
        containerHeight = 400, // 테이블 컨테이너의 높이 (기본값: 400px)
        overscan = 5, // 가상화 시 미리 렌더링할 추가 행 개수 (기본값: 5)
    } = virtualization // virtualization 객체에서 옵션들을 추출

    const parentRef = useRef<HTMLDivElement>(null)
    const [scrollElement, setScrollElement] = useState<HTMLElement | null>(null)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: paginationEnabled ? pageSize : data.length,
                pageIndex: 0,
            },
        },
    })

    const { rows } = table.getRowModel()

    // ScrollArea의 viewport 요소를 찾기
    useEffect(() => {
        if (parentRef.current && virtualEnabled) {
            const viewport = parentRef.current.querySelector('[data-radix-scroll-area-viewport]') as HTMLElement
            setScrollElement(viewport)
        }
    }, [virtualEnabled])

    const virtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => scrollElement,
        estimateSize: () => rowHeight,
        overscan,
    })

    const generatePageNumbers = () => {
        if (!showPageNumbers || !paginationEnabled) return []

        const currentPage = table.getState().pagination.pageIndex + 1
        const totalPages = table.getPageCount()

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        const sidePages = Math.floor(maxVisiblePages / 2)
        let startPage = Math.max(1, currentPage - sidePages)
        let endPage = Math.min(totalPages, currentPage + sidePages)

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
        if (!paginationEnabled) return null

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

    if (virtualEnabled) {
        const virtualItems = virtualizer.getVirtualItems()

        return (
            <div>
                {paginationEnabled && (position === 'top' || position === 'both') && renderPagination()}

                <div className="rounded-md border">
                    <ScrollArea
                        ref={parentRef}
                        style={{ height: containerHeight }}
                        className="w-full"
                    >
                        <div style={{ height: virtualizer.getTotalSize() + rowHeight, width: '100%', position: 'relative' }}>
                            {/* 고정 헤더 */}
                            <div className="sticky top-0 z-10 bg-background border-b">
                                <Table className="table-fixed w-full">
                                    <TableHeader>
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map((header) => (
                                                    <TableHead
                                                        key={header.id}
                                                        className="truncate"
                                                        style={{
                                                            width: header.getSize() !== 150 ? `${header.getSize()}px` : `${100 / headerGroup.headers.length}%`,
                                                            height: rowHeight
                                                        }}
                                                    >
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext(),
                                                            )}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                </Table>
                            </div>

                            {/* 가상화된 행들 */}
                            {virtualItems.map((virtualRow) => {
                                const row = rows[virtualRow.index]
                                if (!row) return null

                                return (
                                    <div
                                        key={row.id}
                                        style={{
                                            position: 'absolute',
                                            top: rowHeight, // 헤더 높이만큼 오프셋
                                            left: 0,
                                            width: '100%',
                                            height: `${virtualRow.size}px`,
                                            transform: `translateY(${virtualRow.start}px)`,
                                        }}
                                    >
                                        <Table className="table-fixed w-full">
                                            <TableBody>
                                                <TableRow
                                                    data-state={row.getIsSelected() && 'selected'}
                                                    style={{ height: rowHeight }}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            className="truncate"
                                                            style={{
                                                                width: cell.column.getSize() !== 150 ? `${cell.column.getSize()}px` : `${100 / row.getVisibleCells().length}%`
                                                            }}
                                                        >
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext(),
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                )
                            })}
                        </div>
                    </ScrollArea>
                </div>

                {paginationEnabled && (position === 'bottom' || position === 'both') && renderPagination()}
            </div>
        )
    }

    // 일반 테이블 (페이지네이션 활성화 시)
    return (
        <div>
            {paginationEnabled && (position === 'top' || position === 'both') && renderPagination()}

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
                                                header.column.columnDef.header,
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
                                    data-state={row.getIsSelected() && 'selected'}
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

            {paginationEnabled && (position === 'bottom' || position === 'both') && renderPagination()}
        </div>
    )
}