import { ReactNode } from 'react'

import { Navbar } from '../Navbar'

interface ContentProps {
	children: ReactNode
}

export const Content = ({ children }: ContentProps) => {
	return (
		<section className="h-full w-full">
			<Navbar />
			<main className="h-full w-full px-4 pt-14">{children}</main>
		</section>
	)
}
