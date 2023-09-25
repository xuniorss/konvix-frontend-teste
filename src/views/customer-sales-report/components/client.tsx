import { DataTable } from '@/components/ui/data-table'

import { columns, CustomerColumn } from './collumns'

interface CustomerClientProps {
	data: CustomerColumn[]
}

export const CustomerClient = ({ data }: CustomerClientProps) => {
	return <DataTable columns={columns} data={data} />
}
