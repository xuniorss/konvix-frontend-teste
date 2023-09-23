import { useModal } from '@/hooks/useModal'
import { usePagination } from '@/hooks/usePagination'
import { customersApi } from '@/services/customers'
import { queryClient } from '@/services/query-client'
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

export const RemoveCustomerModal = () => {
	const [loading, setLoading] = useState(false)
	const { isOpen, type, data, onClose } = useModal()
	const { customerId } = data
	const { page } = usePagination()

	const isDialogOpen = isOpen && type === 'removeCustomer'

	const { mutate } = useMutation({
		mutationFn: () => customersApi.fetchCustomers({ page }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['customers', page] })
		},
	})

	const handleRemove = async () => {
		try {
			setLoading(true)
			await customersApi.removeCustomer(String(customerId))
			mutate()
			toast.success('Cliente removido com sucesso.')
		} catch (error) {
			toast.error('Problema ao remover este cliente.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<AlertDialog open={isDialogOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não pode ser desfeita. Isso excluirá permanentemente
						o cliente.
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
