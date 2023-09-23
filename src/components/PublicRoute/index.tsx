import { useAuthStore } from '@/store/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicRoute = () => {
	const { isAuthenticated } = useAuthStore()

	return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />
}
