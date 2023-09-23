import { useAuthStore } from '@/store/auth'
import { useNavigate } from 'react-router-dom'

import { Button } from '../ui/button'

export const Navbar = () => {
	const { signOut } = useAuthStore()
	const navigate = useNavigate()

	const handleSignOut = async () => {
		await signOut()
		navigate('/')
	}

	return (
		<div>
			<Button type="button" onClick={handleSignOut}>
				Sair
			</Button>
		</div>
	)
}
