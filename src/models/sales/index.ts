import { z } from 'zod'

export type SaleProps = {
	cod_cliente: number
	dta_venda: Date
	val_total_venda: number
	cod_venda: number
}

export const SaleFormSchema = z.object({
	dta_venda: z.coerce.date(),
	cod_cliente: z.string().min(1),
})

export type SaleFormProps = z.infer<typeof SaleFormSchema>

export const AddItemSaleFormSchema = z.object({
	des_produto: z
		.string()
		.min(1, { message: 'Descrição do produto é obrigatória.' }),
	val_unitario: z.string().refine(
		(value) => {
			const formattedValue = value.replace(',', '.').replace(/,/g, '')

			const numericValue = parseFloat(
				formattedValue
					.replace('.', '')
					.replace(/\s/g, '')
					.replace(/[^0-9.,]+/g, ''),
			)

			return !isNaN(numericValue) && numericValue > 0
		},
		{
			message: 'O valor unitário deve ser um número maior que 0.',
		},
	),
	qtd_itens: z.string().refine(
		(value) => {
			const intValue = parseInt(value, 10)
			return intValue > 0
		},
		{ message: 'A quantidade deve ser maior que 0.' },
	),
})

export type AddItemSaleFormProps = z.infer<typeof AddItemSaleFormSchema>

type AddItemProps = {
	desProduto: string
	valUnitario: number
	qtdItens: number
	valTotal: number
}

export type ResponseAddItemProps = {
	data: AddItemProps
	valTotalVenda: number
}

export type ItemsProps = {
	cod_item: number
	cod_venda: number
	des_produto: string
	val_unitario: number
	qtd_itens: number
	val_total: number
	dta_cadastro: Date
}

export type ResponseItemsProps = {
	items: ItemsProps[]
	length: number
}
