import { AuthFormProps } from '@/models/auth-form'
import { AuthUserResponseApiProps } from '@/models/auth-user'

import { api } from '../api/api'

const createAccount = async (values: AuthFormProps): Promise<void> => {
	await api.post<void>('/create-account', values)
}

const createSession = async (
	values: AuthFormProps,
): Promise<AuthUserResponseApiProps> => {
	const { data } = await api.post<AuthUserResponseApiProps>(
		'/create-session',
		values,
	)

	return data
}

export const userApi = { createAccount, createSession }
