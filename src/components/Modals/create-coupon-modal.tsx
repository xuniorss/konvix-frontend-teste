import { useSale } from '@/hooks/useSale'
import { cn } from '@/lib/utils'
import { SaleFormProps, SaleFormSchema } from '@/models/sales'
import { customersApi } from '@/services/customers'
import { salesApi } from '@/services/sales'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useCallback } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import { Button, buttonVariants } from '../ui/button'
import { Calendar } from '../ui/calendar'
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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

export const CreateCouponModal = () => {
	const { isNewSale, setCurrentSale, setSale } = useSale()

	const form = useForm<SaleFormProps>({
		resolver: zodResolver(SaleFormSchema),
		defaultValues: { dta_venda: new Date() },
	})

	const { data: customers } = useQuery({
		queryKey: ['all.customers'],
		queryFn: () =>
			customersApi
				.fetchAllCustomers()
				.then((response) =>
					response.filter((customer) => customer.flg_inativo === 0),
				),
	})

	const { isSubmitting, isValid } = form.formState

	const onSubmit: SubmitHandler<SaleFormProps> = useCallback(
		async (values) => {
			try {
				const response = await salesApi.createCoupon(values)

				setCurrentSale()
				setSale(response)

				toast.success('Cupom aberto.')
			} catch (error) {
				toast.error('Problema ao abrir cupom.')
			}
		},
		[setCurrentSale, setSale],
	)

	return (
		<Dialog open={isNewSale}>
			<DialogContent className="overflow-hidden bg-white text-black">
				<DialogHeader>
					<DialogTitle>Faça o lançamento de uma nova venda</DialogTitle>
					<DialogDescription>
						Informe os dados abaixo para prosseguir.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full space-y-2"
					>
						<FormField
							control={form.control}
							name="dta_venda"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Data da venda</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant="outline"
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value &&
															'text-muted-foreground',
													)}
												>
													{field.value &&
														format(field.value, 'dd/MM/yyyy')}
													{!field.value && (
														<span>Selecione a data</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent
											className="w-auto p-0"
											align="start"
										>
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date) =>
													date > new Date() ||
													date < new Date('1900-01-01')
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="cod_cliente"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cliente</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selecione um cliente" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{customers?.map((customer) => (
												<SelectItem
													key={customer.cod_cliente}
													value={`${customer.cod_cliente}`}
												>
													{customer.des_nome}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Informe corretamente o cliente que efetuou a
										compra.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex w-full items-center justify-end gap-x-2 pt-4">
							<Link
								to="/home"
								aria-disabled={isSubmitting}
								className={buttonVariants({ variant: 'secondary' })}
							>
								Votar
							</Link>
							<Button disabled={!isValid || isSubmitting} type="submit">
								Prosseguir
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
