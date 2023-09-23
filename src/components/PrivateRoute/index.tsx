import { useAuthStore } from '@/store/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = () => {
	const { isAuthenticated } = useAuthStore()

	return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
