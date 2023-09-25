import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

export type CustomerColumn = {
	des_nome: string
	val_venda_acumulado: string
	dta_ult_pedido: string
}

export const columns: ColumnDef<CustomerColumn>[] = [
	{
		accessorKey: 'des_nome',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Nome
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className="truncate capitalize">{row.getValue('des_nome')}</div>
		),
	},
	{
		accessorKey: 'val_venda_acumulado',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Vlr venda acumulado
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div>{row.getValue('val_venda_acumulado')}</div>,
	},
	{
		accessorKey: 'dta_ult_pedido',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Data último pedido
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => <div>{row.getValue('dta_ult_pedido')}</div>,
	},
]
