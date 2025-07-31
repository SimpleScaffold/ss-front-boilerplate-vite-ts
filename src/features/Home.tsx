import { ColumnDef } from '@tanstack/react-table'
import { SSdataTable } from 'src/shared/components/table/SSdataTable.tsx'
import { createCellFormatter } from 'src/shared/components/table/options/columns/cellFormatter.tsx'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from 'src/shared/lib/shadcn/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

const Home = () => {
    type Payment = {
        id: string
        amount: number
        status: 'pending' | 'processing' | 'success' | 'failed'
        email: string
    }
    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: 'status',
            header: 'Status',
            size: 200,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            size: 50,
        },
        {
            accessorKey: 'amount',
            header: () => <div className="text-right">Amount</div>,
            ...createCellFormatter({
                key: 'amount',
                format: 'currency',
                align: 'left',
            }),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const payment = row.original
                //todo 이거 컴포넌트화 어떻게 범위를 어디까지 할지 고민중
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(payment.id)
                                }
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>
                                View payment details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const data: Payment[] = [
        { id: '728ed52f', amount: 100, status: 'pending', email: 'm@example.com' },
        { id: '489e1d42', amount: 125, status: 'processing', email: 'example@gmail.com' },
        { id: 'a1b2c3d4', amount: 250, status: 'success', email: 'john@example.com' },
        { id: 'd4e5f6g7', amount: 75, status: 'failed', email: 'jane@example.com' },
        { id: 'h8i9j0k1', amount: 330, status: 'pending', email: 'user1@example.com' },
        { id: 'l2m3n4o5', amount: 180, status: 'success', email: 'user2@example.com' },
        { id: 'p6q7r8s9', amount: 99, status: 'processing', email: 'user3@example.com' },
        { id: 't0u1v2w3', amount: 420, status: 'failed', email: 'user4@example.com' },
        { id: 'x4y5z6a7', amount: 150, status: 'success', email: 'user5@example.com' },
        { id: 'b8c9d0e1', amount: 210, status: 'pending', email: 'user6@example.com' },
        { id: 'f2g3h4i5', amount: 305, status: 'processing', email: 'user7@example.com' },
        { id: 'j6k7l8m9', amount: 165, status: 'success', email: 'user8@example.com' },
        { id: 'n0o1p2q3', amount: 80, status: 'failed', email: 'user9@example.com' },
        { id: 'r4s5t6u7', amount: 190, status: 'success', email: 'user10@example.com' },
        { id: 'v8w9x0y1', amount: 220, status: 'pending', email: 'user11@example.com' },
        { id: 'z2a3b4c5', amount: 140, status: 'processing', email: 'user12@example.com' },
        { id: 'd6e7f8g9', amount: 360, status: 'success', email: 'user13@example.com' },
        { id: 'h0i1j2k3', amount: 55, status: 'failed', email: 'user14@example.com' },
        { id: 'l4m5n6o7', amount: 135, status: 'pending', email: 'user15@example.com' },
        { id: 'p8q9r0s1', amount: 275, status: 'success', email: 'user16@example.com' },
        { id: 't2u3v4w5', amount: 310, status: 'processing', email: 'user17@example.com' },
        { id: 'x6y7z8a9', amount: 145, status: 'success', email: 'user18@example.com' },
        { id: 'b0c1d2e3', amount: 90, status: 'pending', email: 'user19@example.com' },
        { id: 'f4g5h6i7', amount: 400, status: 'processing', email: 'user20@example.com' },
        { id: 'j8k9l0m1', amount: 185, status: 'success', email: 'user21@example.com' },
        { id: 'n2o3p4q5', amount: 305, status: 'failed', email: 'user22@example.com' },
        { id: 'r6s7t8u9', amount: 170, status: 'pending', email: 'user23@example.com' },
        { id: 'v0w1x2y3', amount: 230, status: 'processing', email: 'user24@example.com' },
        { id: 'z4a5b6c7', amount: 310, status: 'success', email: 'user25@example.com' },
        { id: 'd8e9f0g1', amount: 110, status: 'failed', email: 'user26@example.com' },

    ];

    return (
        <div>
            <SSdataTable
                columns={columns}
                data={data}



            />
        </div>
    )
}

export default Home
