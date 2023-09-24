import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/format-currency'
import { ItemsProps } from '@/models/sales'
import { Trash } from 'lucide-react'
import { memo } from 'react'

export const ListItem = memo((item: ItemsProps) => {
	return (
		<article
			className="group rounded border px-4 py-2"
			onClick={() => console.log(item.cod_item)}
		>
			<div className="flex items-center justify-between">
				<section className="flex flex-col space-y-2">
					<div className="flex items-center gap-x-2">
						<span># {item.cod_item}</span>
						<p className="font-semibold">{item.des_produto}</p>
					</div>
					<div className="flex items-center gap-x-2 font-semibold">
						<p>Qtd: {item.qtd_itens}</p>
						<p>Vlr: {formatCurrency.format(item.val_unitario)}</p>
						<p>Tot: {formatCurrency.format(item.val_total)}</p>
					</div>
				</section>

				<Button
					aria-label="button remove item"
					size="icon"
					variant="destructive"
					className="invisible group-hover:visible"
				>
					<Trash className="h-5 w-5" />
				</Button>
			</div>
		</article>
	)
})

ListItem.displayName = 'ListItem'
