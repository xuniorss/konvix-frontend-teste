import { Content } from '@/components/Content'
import { CreateCouponModal } from '@/components/Modals/create-coupon-modal'
import { useSale } from '@/hooks/useSale'
import { customersApi } from '@/services/customers'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FooterSales } from './components/footer'
import { HeaderSales } from './components/header'

const customers = await customersApi.fetchAllCustomers()

export const SalesPage = () => {
	const [isMounted, setIsMounted] = useState(false)
	const { isNewSale, sale, setNewSale } = useSale()
	const navigate = useNavigate()

	useEffect(() => setIsMounted(true), [])

	if (!isMounted) return null

	if (isNewSale) {
		return (
			<Content className="center">
				<CreateCouponModal />
			</Content>
		)
	}

	const customer = customers.find((c) => c.cod_cliente === sale?.cod_cliente)

	if (!customer) {
		setNewSale()
		return navigate('/')
	}

	return (
		<Content>
			<section className="flex h-full flex-col p-4">
				<HeaderSales
					codVenda={Number(sale?.cod_venda)}
					desNome={customer.des_nome}
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
