import { useAuthStore } from '@/store/auth'
import { LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../ui/button'

export const Navbar = () => {
	const { signOut } = useAuthStore()
	const navigate = useNavigate()

	const handleSignOut = async () => {
		await signOut()
		navigate('/')
	}

	return (
		<header className="fixed top-0 z-30 flex h-14 w-full items-center border-b bg-secondary/50">
			<section className="flex w-full items-center justify-between px-4">
				<Link to="/home">
					<h1 className="text-xl font-bold antialiased md:text-2xl">
						Konvix - teste
					</h1>
				</Link>
				<Button
					aria-label="button logout"
					type="button"
					size="sm"
					className="text-sm"
					onClick={handleSignOut}
				>
					Sair
					<LogOut className="ml-2 h-4 w-4" />
				</Button>
			</section>
		</header>
	)
}
