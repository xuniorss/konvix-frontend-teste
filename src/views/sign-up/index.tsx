import { AuthForm } from '@/components/AuthForm'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'

export const SignUpPage = () => {
	return (
		<section className="center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Konvix - Registrar-se</CardTitle>
					<CardDescription>
						Registre-se para gerenciar seu negócio.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AuthForm signUpPage />
				</CardContent>
				<CardFooter className="flex items-center justify-center">
					<p className="text-center text-sm text-zinc-600">
						Já possui conta?,{' '}
						<Link to="/" className="font-semibold text-blue-500">
							Acesse!
						</Link>
					</p>
				</CardFooter>
			</Card>
		</section>
	)
}
