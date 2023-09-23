import { TableCell, TableRow } from '@/components/ui/table'
import { useModal } from '@/hooks/useModal'
import { CustomerProps } from '@/models/customers'
import { format } from 'date-fns'
import { memo } from 'react'

export const CustomerList = memo(({ data }: { data: CustomerProps }) => {
	const { onOpen } = useModal()

	return (
		<TableRow
			className="cursor-pointer"
			onClick={() => onOpen('editCustomer', { customer: data })}
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
