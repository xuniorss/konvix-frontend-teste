import { SaleFormProps, SaleProps } from '@/models/sales'

import { api } from '../api/api'

const createCoupon = async (values: SaleFormProps): Promise<SaleProps> => {
	const { data } = await api.post<SaleProps>('/create-coupon', values)
	return data
}

const destroyCoupon = async (saleId: string): Promise<void> => {
	await api.delete<void>(`/destroy-coupon/${saleId}`)
}

export const salesApi = { createCoupon, destroyCoupon }
