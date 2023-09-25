import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function FilterDate() {
	const [startDate, setStartDate] = useState<Date>()
	const [endDate, setEndDate] = useState<Date>()
	const [, setSearchParams] = useSearchParams()

	useEffect(() => {
		if (startDate && endDate) {
			const startDateString = format(startDate, 'yyyy-MM-dd')
			const endDateString = format(endDate, 'yyyy-MM-dd')

			setSearchParams({
				dta_inicio: startDateString,
				dta_fim: endDateString,
			})
		}
	}, [endDate, startDate, setSearchParams])

	return (
		<section className="flex items-center gap-x-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-[17.5rem] justify-start text-left font-normal',
							!startDate && 'text-muted-foreground',
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{startDate ? (
							format(startDate, 'dd/MM/yyyy')
						) : (
							<span>Selecione a data inicial</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={startDate}
						onSelect={setStartDate}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-[17.5rem] justify-start text-left font-normal',
							!endDate && 'text-muted-foreground',
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{endDate ? (
							format(endDate, 'dd/MM/yyyy')
						) : (
							<span>Selecione a data final</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={endDate}
						onSelect={setEndDate}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</section>
	)
}
