import {
	AddItemSaleFormProps,
	ReportListItemProps,
	ReportPagination,
	ResponseAddItemProps,
	ResponseItemsProps,
	SaleFormProps,
	SaleProps,
} from '@/models/sales'
import { CustomerColumn } from '@/views/customer-sales-report/components/collumns'

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

const removeItem = async (saleId: number, itemId: number): Promise<void> => {
	await api.delete<void>(`/destroy-item/${saleId}/${itemId}`)
}

const listByCustomers = async (): Promise<CustomerColumn[]> => {
	const { data } = await api.get<CustomerColumn[]>(`/report-sale/customers`)
	return data
}

const listSales = async (
	dta_inicio: string,
	dta_fim: string,
	page: number,
): Promise<ReportPagination> => {
	const { data } = await api.get<ReportPagination>(
		`/report-sale?dta_inicio=${dta_inicio}&dta_fim=${dta_fim}&page=${page}`,
	)
	return data
}

const listItemSales = async (
	saleId: number,
): Promise<ReportListItemProps[]> => {
	const { data } = await api.get<ReportListItemProps[]>(
		`/report-sale/${saleId}`,
	)
	return data
}

export const salesApi = {
	createCoupon,
	destroyCoupon,
	fetchItems,
	addItem,
	endSale,
	removeItem,
	listByCustomers,
	listSales,
	listItemSales,
}
