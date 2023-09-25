import { Content } from '@/components/Content'
import { formatCurrency } from '@/lib/format-currency'
import { salesApi } from '@/services/sales'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'

import { CustomerClient } from './components/client'
import { CustomerColumn } from './components/collumns'

export const CustomerSalesReport = () => {
	const { data, isLoading } = useQuery({
		queryKey: [import.meta.env.VITE_REPORT_SALES_CUSTOMERS],
		queryFn: () => salesApi.listByCustomers(),
	})

	if (isLoading) {
		return (
			<Content className="center">
				<span>
					<Loader2 className="mr-2 h-4 w-4" />
					<p>Buscando dados...</p>
				</span>
			</Content>
		)
	}

	if (!data) {
		return (
			<Content className="center">
				<h1>Nenhum registro encontrado</h1>
			</Content>
		)
	}

	const formattedCustomerSales: CustomerColumn[] = data.map((item) => ({
		des_nome: item.des_nome,
		val_venda_acumulado: formatCurrency.format(
			Number(item.val_venda_acumulado),
		),
		dta_ult_pedido: format(new Date(item.dta_ult_pedido), 'dd/MM/yyyy'),
	}))

	return (
		<Content className="flex flex-col">
			<section className="my-6 text-xl font-semibold">
				<h1>Relatório de vendas por cliente</h1>
			</section>

			<section className="flex w-full items-center justify-center">
				<div className="w-full max-w-7xl">
					<CustomerClient data={formattedCustomerSales} />
				</div>
			</section>
		</Content>
	)
}
