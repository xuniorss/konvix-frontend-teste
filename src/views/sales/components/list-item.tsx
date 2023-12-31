import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/useModal'
import { formatCurrency } from '@/lib/format-currency'
import { ItemsProps } from '@/models/sales'
import { Trash } from 'lucide-react'
import { memo } from 'react'

export const ListItem = memo((item: ItemsProps) => {
	const { onOpen } = useModal()

	return (
		<article className="group rounded border px-4 py-2">
			<div className="flex items-center justify-between">
				<section className="flex flex-col space-y-2">
					<div className="flex items-center gap-x-2">
						<span># {item.cod_item}</span>
						<p className="font-semibold">{item.des_produto}</p>
					</div>
					<div className="flex items-center gap-x-2">
						<p>
							<strong>Qtd:</strong> {item.qtd_itens}
						</p>
						<p>
							<strong>Vlr. unit:</strong>{' '}
							{formatCurrency.format(item.val_unitario)}
						</p>
						<p>
							<strong>Vlr. Tot:</strong>{' '}
							{formatCurrency.format(item.val_total)}
						</p>
					</div>
				</section>

				<Button
					aria-label="button remove item"
					size="icon"
					variant="destructive"
					className="invisible group-hover:visible"
					onClick={() => onOpen('removeItemSale', { item })}
				>
					<Trash className="h-5 w-5" />
				</Button>
			</div>
		</article>
	)
})

ListItem.displayName = 'ListItem'
