import { CustomerProps } from '@/models/customers'
import { create } from 'zustand'

export type ModalType =
	| 'createCustomer'
	| 'editCustomer'
	| 'removeCustomer'
	| 'addItemSale'

interface ModalData {
	customer?: CustomerProps
	customerId?: string
}

interface ModalStore {
	type: ModalType | null
	data: ModalData
	isOpen: boolean
	onOpen: (type: ModalType, data?: ModalData) => void
	onClose: () => void
}

export const useModal = create<ModalStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
	onClose: () => set({ isOpen: false, type: null }),
}))
