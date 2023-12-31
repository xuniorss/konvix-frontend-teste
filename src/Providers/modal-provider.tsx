import { AddItemSaleModal } from '@/components/Modals/add-item-sale-modal'
import { CancelSaleModal } from '@/components/Modals/cancel-sale-modal'
import { CreateCustomerModal } from '@/components/Modals/create-customer-modal'
import { EditCustomerModal } from '@/components/Modals/edit-customer-modal'
import { ListItemSaleModal } from '@/components/Modals/list-item-sale.modal'
import { RemoveCustomerModal } from '@/components/Modals/remove-customer-modal'
import { RemoveItemModal } from '@/components/Modals/remove-item-modal'
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => setIsMounted(true), [])

	if (!isMounted) return null

	return (
		<>
			<CreateCustomerModal />
			<EditCustomerModal />
			<RemoveCustomerModal />
			<AddItemSaleModal />
			<RemoveItemModal />
			<CancelSaleModal />
			<ListItemSaleModal />
		</>
	)
}
