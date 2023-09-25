import { TableCell, TableRow } from '@/components/ui/table'
import { useModal } from '@/hooks/useModal'
import { formatCurrency } from '@/lib/format-currency'
import { ResponseFilterProps } from '@/models/sales'
import { memo } from 'react'

export const ReportList = memo((data: ResponseFilterProps) => {
	const { onOpen } = useModal()

	return (
		<TableRow
			className="cursor-pointer"
			onClick={() => onOpen('reportItemSale', { saleId: data.cod_venda })}
		>
			<TableCell>{data.cod_venda}</TableCell>
			<TableCell>{data.cod_cliente}</TableCell>
			<TableCell>{formatCurrency.format(data.val_total_venda)}</TableCell>
			<TableCell>{data.des_nome}</TableCell>
			<TableCell>{data.des_cidade}</TableCell>
			<TableCell>{data.des_uf}</TableCell>
			<TableCell>{data.des_telefone}</TableCell>
		</TableRow>
	)
})

ReportList.displayName = 'ReportList'
