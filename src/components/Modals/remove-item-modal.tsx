import { useModal } from '@/hooks/useModal'
import { useSale } from '@/hooks/useSale'
import { SaleProps } from '@/models/sales'
import { queryClient } from '@/services/query-client'
import { salesApi } from '@/services/sales'
import { useMutation } from '@tanstack/react-query'
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

export const RemoveItemModal = () => {
	const [loading, setLoading] = useState(false)
	const { isOpen, type, data, onClose } = useModal()
	const { item } = data
	const { sale, setSale } = useSale()

	const isDialogOpen = isOpen && type === 'removeItemSale'

	const { mutate } = useMutation({
		mutationFn: () =>
			salesApi.fetchItems(
				String(sale?.cod_cliente),
				String(sale?.cod_venda),
			),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [import.meta.env.VITE_SALES],
			})
		},
	})

	const handleRemove = async () => {
		try {
			setLoading(true)
			await salesApi.removeItem(
				Number(sale?.cod_venda),
				Number(item?.cod_item),
			)

			const saleStore: SaleProps = {
				...(sale as SaleProps),
				val_total_venda:
					Number(sale?.val_total_venda) - Number(item?.val_total),
			}

			setSale(saleStore)

			mutate()
			toast.success('Item removido com sucesso.')
		} catch (error) {
			toast.error('Problema ao remover este item.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<AlertDialog open={isDialogOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Remover item?</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não pode ser desfeita
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction disabled={loading} onClick={handleRemove}>
						Continuar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
