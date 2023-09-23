import { CustomerFormProps, CustomerPagination } from '@/models/customers'

import { api } from '../api/api'

const fetchCustomers = async ({
	page,
}: {
	page: number
}): Promise<CustomerPagination> => {
	const { data } = await api.get<CustomerPagination>(`/customers?page=${page}`)
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
}) => {
	const { data } = await api.put(`/customer/${id}`, values)
	return data
}

export const customersApi = { fetchCustomers, registerCustomer, updateCustomer }
