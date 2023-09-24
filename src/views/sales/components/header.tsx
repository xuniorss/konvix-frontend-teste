import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/useModal'
import { Plus } from 'lucide-react'

interface IHeaderSales {
	codVenda: number
	desNome: string
}

export const HeaderSales = ({ codVenda, desNome }: IHeaderSales) => {
	const { onOpen } = useModal()

	return (
		<div className="flex w-full items-center justify-between border-b pb-4">
			<div className="flex flex-col space-y-3">
				<h2 className="text-xl font-bold">Lançando nova venda</h2>
				<span>
					<h3>
						<strong className="text-emerald-600">Código da venda:</strong>{' '}
						{codVenda}
					</h3>
					<p className="truncate">
						<strong className="text-emerald-600">
							Nome do(a) cliente:
						</strong>{' '}
						{desNome}
					</p>
				</span>
			</div>
			<Button
				aria-label="button add new product"
				className="truncate"
				size="sm"
				variant="secondary"
				onClick={() => onOpen('addItemSale')}
			>
				<Plus className="mr-0 h-4 w-4 md:mr-2" />
				<p className="hidden md:block">Add produto</p>
			</Button>
		</div>
	)
}
