import { PaginationMeta } from '../pagination'

export type CustomerProps = {
	cod_cliente: string
	des_nome: string
	flg_inativo: number
	des_endereco: string
	num_endereco: number | null
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
