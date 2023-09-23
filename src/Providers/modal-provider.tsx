import { CreateCustomerModal } from '@/components/Modals/create-customer-modal'
import { EditCustomerModal } from '@/components/Modals/edit-customer-modal'
import { useEffect, useState } from 'react'

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => setIsMounted(true), [])

	if (!isMounted) return null

	return (
		<>
			<CreateCustomerModal />
			<EditCustomerModal />
		</>
	)
}
