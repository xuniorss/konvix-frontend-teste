import { Content } from '@/components/Content'
import { Separator } from '@/components/ui/separator'
import { ResponseFilterProps } from '@/models/sales'
import { salesApi } from '@/services/sales'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterDate } from './components/FilterDate'

export const SalesReportPage = () => {
	const [searchParams] = useSearchParams()
	const [report, setReport] = useState<ResponseFilterProps[]>([])

	const startDate = searchParams.get('dta_inicio')
	const endDate = searchParams.get('dta_fim')

	const fetchReport = useCallback(async () => {
		const result = await salesApi.listSales(
			String(startDate),
			String(endDate),
		)

		if (result.length > 0) setReport(result)
		else setReport([])
	}, [endDate, startDate])

	useEffect(() => {
		fetchReport()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startDate, endDate])

	return (
		<Content>
			<section className="my-6">
				<div className="space-y-3">
					<h1 className="text-xl font-semibold">Relatório de vendas</h1>
					<Separator />
					<section className="flex flex-col items-center gap-x-3 md:flex-row">
						<FilterDate />
					</section>
				</div>
				{report.length <= 0 && <p>Sem dados</p>}

				{report.length > 0 && <p>Dados</p>}
			</section>
		</Content>
	)
}
