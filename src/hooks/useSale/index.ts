import { SaleProps } from '@/models/sales'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type StateProps = {
	isNewSale: boolean
	sale: SaleProps | null
}

type ActionProps = {
	setCurrentSale: () => void
	setNewSale: () => void
	setSale: (sale: SaleProps) => void
}

export const useSale = create<StateProps & ActionProps>()(
	devtools(
		persist(
			(set) => ({
				isNewSale: true,
				sale: null,
				setCurrentSale: () => set({ isNewSale: false }),
				setNewSale: () => set({ isNewSale: true, sale: null }),
				setSale: (sale) => set({ sale }),
			}),
			{ name: 'konvix-coupon-sales' },
		),
	),
)
