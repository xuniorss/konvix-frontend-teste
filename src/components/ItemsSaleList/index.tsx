import { formatCurrency } from '@/lib/format-currency'
import { ReportListItemProps } from '@/models/sales'
import { memo } from 'react'

import { InfoItem } from './info-item'

export const ItemsSaleList = memo((item: ReportListItemProps) => {
	return (
		<div className="flex flex-col space-y-1 border-b">
			<span className="flex items-center gap-x-1.5">
				<small className="text-muted-foreground">#{item.cod_item}</small>
				<p className="truncate">{item.des_produto}</p>
			</span>
			<div className="flex items-center gap-x-2">
				<InfoItem
					label="Vrl. unit:"
					text={formatCurrency.format(item.val_unitario)}
				/>
				<InfoItem label="Qtd:" text={item.qtd_itens} />
				<InfoItem
					label="Vlr. tot:"
					text={formatCurrency.format(item.val_total)}
				/>
			</div>
		</div>
	)
})

ItemsSaleList.displayName = 'ItemsSaleList'
