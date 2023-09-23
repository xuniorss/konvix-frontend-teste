export type UserProps = {
	cod_usuario: number
	des_email: string
	flg_inativo: number
}

type TokenProps = {
	type: string
	token: string
	expires_at: string
}

export type AuthUserResponseApiProps = {
	user: UserProps
	token: TokenProps
	expires: number
}
