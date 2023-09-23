import { NavigationProps } from '@/models/navigation'
import { Contact, ListOrdered, PercentCircle, Users2 } from 'lucide-react'

export const navigationRoutes: NavigationProps[] = [
	{
		label: 'Clientes',
		description: 'Gerencie todos seus clientes',
		href: '/customers',
		icon: Users2,
	},
	{
		label: 'Vendas',
		description: 'Faça o lançamento das vendas',
		href: '/sales',
		icon: PercentCircle,
	},
	{
		label: 'Relatório de Vendas',
		description: 'Veja todas as vendas',
		href: '/sales-report',
		icon: ListOrdered,
	},
	{
		label: 'Relatório de Vendas por Cliente',
		description: 'Veja todas as vendas por cliente',
		href: '/customer-sales-report',
		icon: Contact,
	},
]
