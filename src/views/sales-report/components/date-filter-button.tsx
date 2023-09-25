import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { LucideIcon } from 'lucide-react'

interface DateFilterButtonProps {
	icon: LucideIcon
	text: string
	date?: Date | null
}

export const DateFilterButton = ({
	icon: Icon,
	text,
	date,
}: DateFilterButtonProps) => {
	return (
		<div
			role="button"
			className={buttonVariants({
				className: cn(
					'w-[17.5rem] justify-start text-left font-normal',
					!date && 'text-muted-foreground',
				),
				variant: 'outline',
			})}
		>
			<Icon className="mr-2 h-4 w-4" />
			{date ? format(date, 'dd/MM/yyyy') : <span>{text}</span>}
		</div>
	)
}
