import { CustomerPagination } from '@/models/customers'
import { api } from '../api/api'

const fetchCustomers = async ({
	page,
}: {
	page: number
}): Promise<CustomerPagination> => {
	const { data } = await api.get<CustomerPagination>(`/customers?page=${page}`)
	return data
}

export const customersApi = { fetchCustomers }
