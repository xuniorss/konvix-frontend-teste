import { Button } from '@/components/ui/button'
import { useModal } from '@/hooks/useModal'
import { useSale } from '@/hooks/useSale'
import { formatCurrency } from '@/lib/format-currency'
import { salesApi } from '@/services/sales'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const FooterSales = () => {
	const { sale, setNewSale } = useSale()
	const navigate = useNavigate()
	const { onOpen } = useModal()

	const { data } = useQuery({
		queryKey: [import.meta.env.VITE_SALES],
		queryFn: () =>
			salesApi.fetchItems(
				String(sale?.cod_cliente),
				String(sale?.cod_venda),
			),
	})

	const disableButton = Number(data?.length) <= 0

	const handleEndSale = async () => {
		try {
			await salesApi.endSale(String(sale?.cod_cliente))

			setNewSale()
			navigate('/home')

			toast.success('Venda finalizada com sucesso.')
		} catch (error) {
			toast.error('Problema ao finalizar venda.')
		}
	}

	return (
		<footer className="w-full border-t">
			<section className="flex flex-col-reverse gap-y-2 p-3 md:flex-row md:items-center md:justify-between md:gap-y-0">
				<Button onClick={() => onOpen('cancelSale')} variant="destructive">
					Cancelar venda
				</Button>
				<span className="text-center">
					Total da venda:{' '}
					<strong>
						{formatCurrency.format(sale?.val_total_venda ?? 0)}
					</strong>
				</span>
				<Button onClick={handleEndSale} disabled={disableButton}>
					Gravar venda
				</Button>
			</section>
		</footer>
	)
}
