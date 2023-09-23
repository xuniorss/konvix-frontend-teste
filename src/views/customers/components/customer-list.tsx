import { TableCell, TableRow } from '@/components/ui/table'
import { CustomerProps } from '@/models/customers'
import { format } from 'date-fns'
import { memo } from 'react'

export const CustomerList = memo(({ data }: { data: CustomerProps }) => {
	return (
		<TableRow
			className="cursor-pointer"
			onClick={() => console.log(data.cod_cliente)}
		>
			<TableCell>{data.cod_cliente}</TableCell>
			<TableCell>{data.des_nome}</TableCell>
			<TableCell>{data.flg_inativo === 0 ? 'Não' : 'Sim'}</TableCell>
			<TableCell>
				{format(new Date(data.created_at), 'dd/MM/yyyy')}
			</TableCell>
		</TableRow>
	)
})

CustomerList.displayName = 'CustomerList'
