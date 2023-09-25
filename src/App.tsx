import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute'
import { CustomerSalesReportPage } from './views/customer-sales-report'
import { CustomersPage } from './views/customers'
import { HomePage } from './views/home'
import { SalesPage } from './views/sales'
import { SalesReportPage } from './views/sales-report'
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
						element={<CustomerSalesReportPage />}
					/>
					<Route path="sales-report" element={<SalesReportPage />} />
				</Route>
			</Routes>
		</>
	)
}
