import { cn } from '@/lib/utils'
import { ComponentProps, ReactNode } from 'react'

import { Navbar } from '../Navbar'

interface ContentProps extends ComponentProps<'main'> {
	children: ReactNode
}

export const Content = ({ children, className, ...rest }: ContentProps) => {
	return (
		<section className="h-full w-full">
			<Navbar />
			<main className={cn('h-full w-full px-4 pt-14', className)} {...rest}>
				{children}
			</main>
		</section>
	)
}
