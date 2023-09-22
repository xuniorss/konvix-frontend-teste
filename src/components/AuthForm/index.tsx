import { AuthFormProps, AuthFormSchema } from '@/models/auth-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

interface IAuthForm {
	signUpPage?: boolean
}

export const AuthForm = ({ signUpPage = false }: IAuthForm) => {
	const [showPass, setShowPass] = useState(false)

	const form = useForm<AuthFormProps>({
		resolver: zodResolver(AuthFormSchema),
		defaultValues: { des_email: '', des_senha: '' },
	})

	const { isSubmitting, isValid } = form.formState

	const onSubmit: SubmitHandler<AuthFormProps> = async (data) => {
		try {
			console.log(data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="des_email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									placeholder='e.g: "exemplo@exemplo.com"'
									type="email"
									disabled={isSubmitting}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="des_senha"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type={showPass ? 'text' : 'password'}
										placeholder="Sua senha"
										className="pr-11"
										disabled={isSubmitting}
										{...field}
									/>
									<Button
										size="icon"
										variant="ghost"
										type="button"
										onClick={() => setShowPass((prev) => !prev)}
										className="absolute right-0 top-0"
									>
										{showPass && <Eye className="h-4 w-4" />}
										{!showPass && <EyeOff className="h-4 w-4" />}
									</Button>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex w-full items-center justify-end">
					<Button type="submit" disabled={!isValid || isSubmitting}>
						{signUpPage ? 'Registrar-se' : 'Acessar'}
					</Button>
				</div>
			</form>
		</Form>
	)
}
