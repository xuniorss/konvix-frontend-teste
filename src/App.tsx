import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute'
import { CustomerSalesReport } from './views/customer-sales-report'
import { CustomersPage } from './views/customers'
import { HomePage } from './views/home'
import { SalesPage } from './views/sales'
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
					<Route path="customers" element={<CustomersPage />} />
					<Route path="sales" element={<SalesPage />} />
					<Route
						path="customer-sales-report"
						element={<CustomerSalesReport />}
					/>
				</Route>
			</Routes>
		</>
	)
}
