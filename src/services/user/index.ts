import { AuthFormProps } from '@/models/auth-form'
import { api } from '../api/api'

const createAccount = async (values: AuthFormProps): Promise<void> => {
	await api.post<void>('/create-account', values)
}

export const userApi = { createAccount }
