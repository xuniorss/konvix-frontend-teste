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

export const SignInPage = () => {
	return (
		<section className="center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Konvix - Acessar</CardTitle>
					<CardDescription>
						Acesse com sua conta e gerencie seu negócio.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<AuthForm />
				</CardContent>
				<CardFooter className="flex items-center justify-center">
					<p className="text-center text-sm text-zinc-600">
						Não possui conta?,{' '}
						<Link to="/sign-up" className="font-semibold text-blue-500">
							Faça uma agora mesmo!
						</Link>
					</p>
				</CardFooter>
			</Card>
		</section>
	)
}
