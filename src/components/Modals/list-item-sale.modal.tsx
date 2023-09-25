import { useModal } from '@/hooks/useModal'
import { salesApi } from '@/services/sales'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { ItemsSaleList } from '../ItemsSaleList'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'

const ITEMS_PER_PAGE = 10

export const ListItemSaleModal = () => {
	const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE)
	const { type, isOpen, onClose, data } = useModal()
	const { saleId } = data

	const isModalOpen = isOpen && type === 'reportItemSale'

	const { data: items } = useQuery({
		queryKey: [import.meta.env.VITE_LIST_ITEM_SALES],
		queryFn: () => salesApi.listItemSales(Number(saleId)),
		enabled: isModalOpen,
	})

	const loadMore = useCallback(
		() => setItemsToShow(itemsToShow + ITEMS_PER_PAGE),
		[itemsToShow],
	)

	const hasMoreItems = itemsToShow < Number(items?.length)

	const displayedItems = useMemo(
		() => items?.slice(0, itemsToShow),
		[items, itemsToShow],
	)

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="overflow-hidden bg-white text-black">
				<DialogTitle>Dados da venda ({saleId})</DialogTitle>
				<section>
					<InfiniteScroll
						dataLength={itemsToShow}
						next={loadMore}
						hasMore={hasMoreItems}
						loader={<h4>Carregando...</h4>}
						height={200}
						className="space-y-2"
					>
						{displayedItems?.map((item) => (
							<ItemsSaleList key={item.cod_item} {...item} />
						))}
					</InfiniteScroll>
				</section>
			</DialogContent>
		</Dialog>
	)
}
