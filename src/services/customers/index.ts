import {
	CustomerFormProps,
	CustomerPagination,
	CustomerProps,
} from '@/models/customers'

import { api } from '../api/api'

const fetchCustomers = async ({
	page,
}: {
	page: number
}): Promise<CustomerPagination> => {
	const { data } = await api.get<CustomerPagination>(`/customers?page=${page}`)
	return data
}

const fetchAllCustomers = async (): Promise<CustomerProps[]> => {
	const { data } = await api.get<CustomerProps[]>('/customers/all')
	return data
}

const registerCustomer = async (data: CustomerFormProps): Promise<void> => {
	await api.post<void>('/create-customer', data)
}

const updateCustomer = async ({
	id,
	values,
}: {
	id: string
	values: CustomerFormProps
}): Promise<CustomerFormProps> => {
	const { data } = await api.put<CustomerFormProps>(`/customer/${id}`, values)
	return data
}

const removeCustomer = async (id: string): Promise<void> => {
	await api.delete<void>(`/customer/${id}`)
}

export const customersApi = {
	fetchCustomers,
	fetchAllCustomers,
	registerCustomer,
	updateCustomer,
	removeCustomer,
}
