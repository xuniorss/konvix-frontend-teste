import { z } from 'zod'

export const AuthFormSchema = z.object({
	des_email: z.string().min(1, { message: 'E-mail obrigatório.' }).email(),
	des_senha: z
		.string()
		.min(4, { message: 'Senha obrigatória com no mínimo 4 caracteres.' }),
})

export type AuthFormProps = z.infer<typeof AuthFormSchema>
