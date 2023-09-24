import {
	AddItemSaleFormProps,
	ResponseAddItemProps,
	ResponseItemsProps,
	SaleFormProps,
	SaleProps,
} from '@/models/sales'

import { api } from '../api/api'

const createCoupon = async (values: SaleFormProps): Promise<SaleProps> => {
	const { data } = await api.post<SaleProps>('/create-coupon', values)
	return data
}

const destroyCoupon = async (saleId: string): Promise<void> => {
	await api.delete<void>(`/destroy-coupon/${saleId}`)
}

const fetchItems = async (
	customerId: string,
	saleId: string,
): Promise<ResponseItemsProps> => {
	const { data } = await api.get<ResponseItemsProps>(
		`/sale-item/${customerId}/${saleId}`,
	)
	return data
}

const addItem = async (
	saleId: number,
	item: AddItemSaleFormProps,
): Promise<ResponseAddItemProps> => {
	const { data } = await api.post<ResponseAddItemProps>(
		`/add-item/${saleId}`,
		item,
	)
	return data
}

const endSale = async (customerId: string): Promise<void> => {
	await api.post<void>(`/end-sale/${customerId}`)
}

export const salesApi = {
	createCoupon,
	destroyCoupon,
	fetchItems,
	addItem,
	endSale,
}
