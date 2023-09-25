import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { DateFilterButton } from './date-filter-button'

export function DateFilter() {
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
		<section className="flex flex-col gap-x-2 space-y-2 md:flex-row md:items-center md:space-y-0">
			<Popover>
				<PopoverTrigger>
					<DateFilterButton
						icon={CalendarIcon}
						text="Selecione a data inicial"
						date={startDate}
					/>
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
				<PopoverTrigger>
					<DateFilterButton
						icon={CalendarIcon}
						text="Selecione a data final"
						date={endDate}
					/>
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
