import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute'
import { HomePage } from './views/home'
import { SignInPage } from './views/sign-in'
import { SignUpPage } from './views/sign-up'

export default function App() {
	return (
		<>
			<Toaster />
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/" element={<SignInPage />} />
					<Route path="/sign-up" element={<SignUpPage />} />
				</Route>

				<Route path="/" element={<PrivateRoute />}>
					<Route path="home" element={<HomePage />} />
				</Route>
			</Routes>
		</>
	)
}
