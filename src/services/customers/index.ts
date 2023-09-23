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

export const customersApi = { fetchCustomers, registerCustomer }
