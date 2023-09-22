import { ReactNode } from 'react'
import { Navbar } from '../Navbar'

interface ContentProps {
	children: ReactNode
}

export const Content = ({ children }: ContentProps) => {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
		</div>
	)
}
