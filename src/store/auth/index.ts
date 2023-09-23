import { AuthFormProps } from '@/models/auth-form'
import { UserProps } from '@/models/auth-user'
import { api } from '@/services/api/api'
import { userApi } from '@/services/user'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type StateProps = {
	user: UserProps | null
	isAuthenticated: boolean
}
type ActionsProps = {
	signIn: (credentials: AuthFormProps) => Promise<void>
	signOut: () => void
}

export const useAuthStore = create<StateProps & ActionsProps>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				isAuthenticated: false,

				signIn: async (credentials: AuthFormProps) => {
					try {
						await userApi.createSession(credentials).then((response) => {
							const { token } = response.token

							Cookies.set(import.meta.env.VITE_COOKIES, token, {
								expires: 7,
								path: '/',
								sameSite: 'None',
								secure: true,
							})

							api.defaults.headers['Authorization'] = `Bearer ${token}`

							set({ user: response.user, isAuthenticated: true })

							toast.success(`Bem-vindo(a) ${response.user.des_email}`)
						})
					} catch (error) {
						toast.error('Não foi possível acessar o sistema.')
					}
				},
				signOut: () => {},
			}),
			{ name: 'konvix-userauth-store' },
		),
	),
)
