import { z } from 'zod'

import { PaginationMeta } from '../pagination'

export type CustomerProps = {
	cod_cliente: number
	des_nome: string
	flg_inativo: number
	des_endereco: string
	num_endereco: string | undefined
	des_cidade: string
	des_uf: string
	des_telefone: string
	des_contato: string
	val_venda_acumulado: number
	qtd_venda_pedidos: number
	dta_ult_pedido: Date
	created_at: Date
	updated_at: Date
}

export type CustomerPagination = {
	customers: {
		meta: PaginationMeta
		data: CustomerProps[]
	}
}

export type UfProps = {
	id: number
	sigla: string
	nome: string
	regiao: {
		id: number
		sigla: string
		nome: string
	}
}

export const CustomerFormSchema = z.object({
	des_nome: z.string().min(1, { message: 'Nome do cliente é obrigatório.' }),
	flg_inativo: z.boolean().optional(),
	des_endereco: z.string().min(1, { message: 'Endereço é obrigatório.' }),
	num_endereco: z.string().optional(),
	des_cidade: z.string().min(1, { message: 'Cidade obrigatória.' }),
	des_uf: z.string().max(2, { message: 'UF obrigatória.' }),
	des_telefone: z.string().max(14, { message: 'Telefone obrigatório.' }),
	des_contato: z.string().min(1, { message: 'Contato obrigatório.' }),
})

export type CustomerFormProps = z.infer<typeof CustomerFormSchema>
