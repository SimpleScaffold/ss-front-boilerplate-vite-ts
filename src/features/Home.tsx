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
        status: "pending" | "processing" | "success" | "failed"
        email: string
    }
    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "amount",
            header: () => <div className="text-right">Amount</div>,
            ...createCellFormatter({
                key: "amount",
                format: "currency",
                align: "left",
            }),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const payment = row.original
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
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const data: Payment[] =  [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },

    ]


    return <div>


        <SSdataTable
            columns={columns}
            data={data}
        />


    </div>
}

export default Home
