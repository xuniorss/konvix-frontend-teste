import { ButtonPagination } from '@/components/ButtonPagination'
import { Content } from '@/components/Content'
import { DynamicTable } from '@/components/DynamicTable'
import { Button } from '@/components/ui/button'
import { customersApi } from '@/services/customers'
import { usePagination } from '@/store/pagination'
import { useQuery } from '@tanstack/react-query'
import { Loader2, UserPlus } from 'lucide-react'
import { CustomerList } from './components/customer-list'

// const { data } = await axios.get(
// 	'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
// )

export const CustomersPage = () => {
	const { page } = usePagination()

	const {
		data: customerResult,
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['customers', page],
		queryFn: () => customersApi.fetchCustomers({ page }),
	})

	if (isLoading) {
		return (
			<Content className="center">
				<span className="flex items-center gap-x-2">
					<Loader2 className="h-5 w-5 animate-spin" />
					<p>Buscando...</p>
				</span>
			</Content>
		)
	}

	if (isError) {
		return (
			<Content className="center">
				<p>Ocorreu um erro ao buscar clientes.</p>
				<Button onClick={() => refetch()}>Atualizar</Button>
			</Content>
		)
	}

	const { meta, data } = customerResult.customers

	return (
		<Content>
			<div className="my-4 flex w-full items-start justify-end">
				<Button variant="secondary">
					<UserPlus className="mr-2 h-5 w-5" />
					Novo cliente
				</Button>
			</div>
			<section className="flex h-[40rem] w-full flex-col items-center justify-center rounded-md border px-4">
				<div className="w-full flex-1 p-4">
					<DynamicTable
						labelHead={[
							'Código cliente',
							'Nome cliente',
							'Inativo?',
							'Data cadastro',
						]}
					>
						{data.map((customer) => (
							<CustomerList key={customer.cod_cliente} data={customer} />
						))}
					</DynamicTable>
				</div>
				<div className="flex w-full items-center justify-center border-t">
					<ButtonPagination meta={meta} />
				</div>
			</section>
		</Content>
	)
}
