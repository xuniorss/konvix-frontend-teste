import { Content } from '@/components/Content'
import { CreateCouponModal } from '@/components/Modals/create-coupon-modal'
import { useSale } from '@/hooks/useSale'
import { customersApi } from '@/services/customers'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
				<CreateCouponModal customers={customers} />
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
			<section></section>
		</Content>
	)
}
