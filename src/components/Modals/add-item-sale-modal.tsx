import { useModal } from '@/hooks/useModal'
import { useSale } from '@/hooks/useSale'
import {
	AddItemSaleFormProps,
	AddItemSaleFormSchema,
	SaleProps,
} from '@/models/sales'
import { queryClient } from '@/services/query-client'
import { salesApi } from '@/services/sales'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { CurrencyInput, Locales } from 'input-currency-react'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

export const AddItemSaleModal = () => {
	const { sale, setSale } = useSale()
	const { type, isOpen, onClose } = useModal()

	const isModalOpen = isOpen && type === 'addItemSale'

	const form = useForm<AddItemSaleFormProps>({
		resolver: zodResolver(AddItemSaleFormSchema),
		defaultValues: {
			des_produto: '',
			val_unitario: '0',
			qtd_itens: '1',
		},
	})

	const { mutate } = useMutation({
		mutationFn: () =>
			salesApi.fetchItems(
				String(sale?.cod_cliente),
				String(sale?.cod_venda),
			),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: [import.meta.env.VITE_SALES],
			}),
	})

	const { isSubmitting, isValid } = form.formState

	const onSubmit: SubmitHandler<AddItemSaleFormProps> = useCallback(
		async (values) => {
			try {
				const response = await salesApi.addItem(
					Number(sale?.cod_venda),
					values,
				)

				const saleData: SaleProps = {
					...(sale as SaleProps),
					val_total_venda: response.valTotalVenda,
				}

				mutate()
				setSale(saleData)
				form.reset()
				onClose()

				toast.success('Item adicionado.')
			} catch (error) {
				console.log(error)
				toast.error('Problema ao inserir item na venda.')
			}
		},
		[form, mutate, onClose, sale, setSale],
	)

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="overflow-hidden bg-white text-black">
				<DialogHeader>
					<DialogTitle>
						Dados do produto da venda ({sale?.cod_venda})
					</DialogTitle>
					<DialogDescription>
						Informe corretamente o produto referente a essa venda.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="des_produto"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição do produto</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g 'Coca-Cola (2L)'"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<section className="grid grid-cols-2 gap-x-2">
							<FormField
								control={form.control}
								name="qtd_itens"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Quantidade</FormLabel>
										<FormControl>
											<Input
												disabled={isSubmitting}
												placeholder="1"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="val_unitario"
								defaultValue="0"
								render={({ field: { value, onChange } }) => (
									<FormItem>
										<FormLabel>Valor unitário</FormLabel>
										<FormControl>
											<CurrencyInput
												value={value}
												onChangeEvent={(_, maskedValue) => {
													onChange(maskedValue)
												}}
												options={{
													style: 'decimal',
													allowNegative: false,
													alwaysNegative: false,
													locale: Locales['Portuguese (Brazil)'],
												}}
												required={true}
												className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>

						<div className="flex items-center justify-end">
							<Button
								variant="outline"
								disabled={isSubmitting || !isValid}
							>
								Lançar item
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
