import { NavigationProps } from '@/models/navigation'
import { ArrowRight } from 'lucide-react'
import { memo } from 'react'
import { Link } from 'react-router-dom'

import { buttonVariants } from '../ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'

export const CardNavigation = memo(
	({ label, description, href, icon: Icon }: NavigationProps) => {
		return (
			<Card className="group hover:shadow-md">
				<CardHeader>
					<div className="flex items-center gap-x-2">
						<span className="rounded-full bg-blue-100 p-3">
							<Icon className="h-7 w-7 text-blue-800" />
						</span>
						<CardTitle className="truncate font-semibold text-blue-800">
							{label}
						</CardTitle>
					</div>
					<CardDescription className="text-lg">
						{description}
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Link
						to={href}
						className={buttonVariants({
							className: 'w-full text-center text-lg',
							variant: 'secondary',
						})}
					>
						Acessar
						<ArrowRight className="invisible ml-2 h-4 w-4 text-center group-hover:visible" />
					</Link>
				</CardFooter>
			</Card>
		)
	},
)

CardNavigation.displayName = 'CardNavigation'
