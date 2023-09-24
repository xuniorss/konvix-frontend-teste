import { Content } from '@/components/Content'
import { CreateCouponModal } from '@/components/Modals/create-coupon-modal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSale } from '@/hooks/useSale'
import { CustomerProps } from '@/models/customers'
import { customersApi } from '@/services/customers'
import { salesApi } from '@/services/sales'
import { useQuery } from '@tanstack/react-query'
import memoize from 'memoize-one'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FooterSales } from './components/footer'
import { HeaderSales } from './components/header'
import { ListItem } from './components/list-item'

export const SalesPage = () => {
	const [isMounted, setIsMounted] = useState(false)
	const [customers, setCustomers] = useState<CustomerProps[]>([])

	const { isNewSale, sale, setNewSale } = useSale()
	const navigate = useNavigate()

	useEffect(() => setIsMounted(true), [])

	const { data, isLoading } = useQuery({
		queryKey: [import.meta.env.VITE_SALES],
		queryFn: () =>
			salesApi.fetchItems(
				String(sale?.cod_cliente),
				String(sale?.cod_venda),
			),
	})

	const fetchCustomersMemoized = memoize(async () => {
		try {
			const response = await customersApi.fetchAllCustomers()
			setCustomers(response)
		} catch (error) {
			console.error('Erro ao buscar clientes:', error)
		}
	})

	useEffect(() => {
		fetchCustomersMemoized()
	}, [isMounted])

	if (!isMounted) return null

	if (isNewSale) {
		return (
			<Content className="center">
				<CreateCouponModal />
			</Content>
		)
	}

	if (!sale) {
		setNewSale()
		return navigate('/')
	}

	const customer = customers.find((c) => c.cod_cliente === sale.cod_cliente)

	return (
		<Content>
			<section className="flex h-full flex-col p-4">
				<HeaderSales
					codVenda={Number(sale?.cod_venda)}
					desNome={String(customer?.des_nome)}
				/>
				<section className="md:flex-1">
					<h3 className="text-lg font-semibold">Itens da venda</h3>
					<ScrollArea className="h-[34.375rem]">
						<div className="space-y-3">
							{data && isLoading && (
								<div className="center">
									<p>Buscando itens da venda...</p>
								</div>
							)}
							{data &&
								data.length > 0 &&
								!isLoading &&
								data.items.map((item) => (
									<ListItem key={item.cod_item} {...item} />
								))}
						</div>
					</ScrollArea>
				</section>
				<FooterSales />
			</section>
		</Content>
	)
}
