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
