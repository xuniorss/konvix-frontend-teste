import { useModal } from '@/hooks/useModal'
import { usePagination } from '@/hooks/usePagination'
import { formatPhoneNumber } from '@/lib/phone-mask'
import { cn } from '@/lib/utils'
import {
	CustomerFormProps,
	CustomerFormSchema,
	UfProps,
} from '@/models/customers'
import { customersApi } from '@/services/customers'
import { queryClient } from '@/services/query-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '../ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../ui/command'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const { data: ufData } = await axios.get<UfProps[]>(import.meta.env.VITE_UF_URL)

export const CreateCustomerModal = () => {
	const { isOpen, onClose, type } = useModal()
	const [openUf, setOpenUf] = useState(false)
	const [ufSelected, setUfSelected] = useState('')
	const [phone, setPhone] = useState('')
	const { page } = usePagination()

	const isModalOpen = isOpen && type === 'createCustomer'

	const form = useForm<CustomerFormProps>({
		resolver: zodResolver(CustomerFormSchema),
		defaultValues: {
			des_nome: '',
			des_endereco: '',
			num_endereco: '',
			des_cidade: '',
			des_uf: '',
			des_telefone: '',
			des_contato: '',
		},
	})

	const { isSubmitting, isValid } = form.formState

	const handleClose = () => {
		form.reset()
		setPhone('')
		onClose()
	}

	const handleSelectUf = (uf: string) => {
		setUfSelected(uf)
		setOpenUf(false)
	}

	const { mutate } = useMutation({
		mutationFn: () => customersApi.fetchCustomers({ page }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['customers', page] })
		},
	})

	const findUfSelected = ufData.find((uf) => uf.sigla === ufSelected)

	const onSubmit: SubmitHandler<CustomerFormProps> = useCallback(
		async (values) => {
			try {
				if (!values || ufSelected.length <= 0) return

				const data = { ...values, des_telefone: phone, des_uf: ufSelected }
				await customersApi.registerCustomer(data)

				form.reset()
				setUfSelected('')
				setPhone('')
				onClose()
				mutate()

				toast.success(`Cliente ${values.des_nome} registrado com sucesso.`)
			} catch (error) {
				toast.error('Problema ao registrar cliente.')
			}
		},
		[form, mutate, onClose, phone, ufSelected],
	)

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className="overflow-hidden bg-white text-black">
				<DialogHeader>
					<DialogTitle>Cadastre um novo cliente</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex w-full flex-col space-y-3"
					>
						<FormField
							control={form.control}
							name="des_nome"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome do cliente</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="Nome do cliente"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<section className="grid w-full grid-cols-3 gap-x-2">
							<FormField
								control={form.control}
								name="des_endereco"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel>Endereço</FormLabel>
										<FormControl>
											<Input
												disabled={isSubmitting}
												placeholder="e.g: 'Quadra CRNW 506 Bloco B Lote 5'"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="num_endereco"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Número (opcional)</FormLabel>
										<FormControl>
											<Input
												disabled={isSubmitting}
												placeholder="e.g: '184'"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>

						<section className="grid w-full grid-cols-2 gap-x-2">
							<FormField
								control={form.control}
								name="des_cidade"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cidade</FormLabel>
										<FormControl>
											<Input
												disabled={isSubmitting}
												placeholder="e.g: 'Brasília'"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="des_uf"
								render={() => (
									<FormItem>
										<FormLabel>UF</FormLabel>
										<Popover open={openUf} onOpenChange={setOpenUf}>
											<PopoverTrigger asChild>
												<Button
													className="w-full justify-between text-black/60"
													variant="outline"
													role="combobox"
													aria-expanded={openUf}
													aria-label="select a uf"
												>
													{findUfSelected?.nome ?? 'Selecionar UF'}
													<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-full p-0">
												<Command>
													<CommandList>
														<CommandInput placeholder="Pesquisar" />
														<CommandEmpty>
															Nenhuma UF encontrada.
														</CommandEmpty>
														<CommandGroup heading="UF's">
															{ufData.map((uf) => (
																<CommandItem
																	key={uf.id}
																	className="text-sm"
																	onSelect={() =>
																		handleSelectUf(uf.sigla)
																	}
																>
																	{`${uf.nome} (${uf.sigla})`}
																	<Check
																		className={cn(
																			'ml-auto h-4 w-4',
																			ufSelected === uf.sigla
																				? 'opacity-100'
																				: 'opacity-0',
																		)}
																	/>
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>

												<FormMessage />
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>

						<section className="grid w-full grid-cols-2 gap-x-2">
							<FormField
								control={form.control}
								name="des_telefone"
								render={() => (
									<FormItem>
										<FormLabel>Telefone</FormLabel>
										<FormControl>
											<Input
												disabled={isSubmitting}
												placeholder="e.g: '(61) 3943-4432'"
												value={phone}
												minLength={14}
												maxLength={14}
												onChange={(e) =>
													setPhone(
														formatPhoneNumber(e.target.value),
													)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="des_contato"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Contato</FormLabel>
										<FormControl>
											<Input
												disabled={isSubmitting}
												placeholder="Nome para contato"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>

						<div className="flex items-center justify-end">
							<Button
								type="submit"
								disabled={
									isSubmitting || !isValid || ufSelected.length <= 0
								}
							>
								Cadastrar
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
