import { ColumnDef } from '@tanstack/react-table'
import { SSdataTable } from 'src/shared/components/table/SSdataTable.tsx'
import { createCellFormatter } from 'src/shared/components/table/options/columns/cellFormatter.tsx'




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
