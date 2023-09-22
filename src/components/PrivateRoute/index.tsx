import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute = () => {
	const isAuthenticated = false

	return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
