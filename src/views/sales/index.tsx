import { Content } from '@/components/Content'
import { CreateCouponModal } from '@/components/Modals/create-coupon-modal'
import { useSale } from '@/hooks/useSale'
import { CustomerProps } from '@/models/customers'
import { customersApi } from '@/services/customers'
import memoize from 'memoize-one'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FooterSales } from './components/footer'
import { HeaderSales } from './components/header'

export const SalesPage = () => {
	const [isMounted, setIsMounted] = useState(false)
	const [customers, setCustomers] = useState<CustomerProps[]>([])

	const { isNewSale, sale, setNewSale } = useSale()
	const navigate = useNavigate()

	useEffect(() => setIsMounted(true), [])

	const fetchCustomersMemoized = memoize(async () => {
		try {
			const response = await customersApi.fetchAllCustomers()
			setCustomers(response)
		} catch (error) {
			console.error('Erro ao buscar clientes:', error)
		}
	})

	useEffect(() => {
		if (!isMounted) return

		fetchCustomersMemoized()
	}, [fetchCustomersMemoized, isMounted])

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
				<section className="flex-1">
					<h3>Itens da venda</h3>
					<div className="h-5/6 overflow-y-auto">item</div>
				</section>
				<FooterSales />
			</section>
		</Content>
	)
}
