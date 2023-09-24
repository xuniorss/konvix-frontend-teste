import { useModal } from '@/hooks/useModal'
import { useSale } from '@/hooks/useSale'
import { salesApi } from '@/services/sales'
import { useState } from 'react'
import toast from 'react-hot-toast'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../ui/alert-dialog'

export const CancelSaleModal = () => {
	const [loading, setLoading] = useState(false)
	const { isOpen, type, onClose } = useModal()

	const { sale, setNewSale } = useSale()

	const isDialogOpen = isOpen && type === 'cancelSale'

	const handleCancelSale = async () => {
		try {
			setLoading(true)
			await salesApi.destroyCoupon(String(sale?.cod_venda))

			setNewSale()
			window.location.assign('/home')
			toast.success('Venda cancelada com sucesso.')
		} catch (error) {
			toast.error('Problema ao cancelar venda.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<AlertDialog open={isDialogOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Cancelar venda?</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não pode ser desfeita
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>
						Não cancelar
					</AlertDialogCancel>
					<AlertDialogAction disabled={loading} onClick={handleCancelSale}>
						Cancelar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
