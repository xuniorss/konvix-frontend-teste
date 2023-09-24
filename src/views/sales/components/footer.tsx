import { Button } from '@/components/ui/button'
import { useSale } from '@/hooks/useSale'
import { salesApi } from '@/services/sales'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const FooterSales = () => {
	const { sale, setNewSale } = useSale()
	const navigate = useNavigate()

	const handleCancelSale = async () => {
		try {
			await salesApi.destroyCoupon(String(sale?.cod_venda))

			setNewSale()
			navigate('/home')

			toast.success('Venda cancelada com sucesso.')
		} catch (error) {
			toast.error('Problema ao cancelar venda.')
		}
	}

	return (
		<footer className="w-full border-t">
			<section className="flex flex-col-reverse gap-y-2 p-3 md:flex-row md:items-center md:justify-between md:gap-y-0">
				<Button onClick={handleCancelSale} variant="destructive">
					Cancelar venda
				</Button>
				<span className="text-center">Total da venda: R$ 0,00</span>
				<Button>Gravar venda</Button>
			</section>
		</footer>
	)
}
