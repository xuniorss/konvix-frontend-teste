import { ButtonPagination } from '@/components/ButtonPagination'
import { Content } from '@/components/Content'
import { DynamicTable } from '@/components/DynamicTable'
import { Separator } from '@/components/ui/separator'
import { usePagination } from '@/hooks/usePagination'
import { ReportPagination } from '@/models/sales'
import { salesApi } from '@/services/sales'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { checkDates } from '@/lib/check-dates'
import { DateFilter } from './components/date-filter'
import { ReportList } from './components/report-list'

export const SalesReportPage = () => {
	const [searchParams] = useSearchParams()
	const [report, setReport] = useState<ReportPagination>({
		data: [],
		meta: undefined,
	})
	const { page } = usePagination()

	const startDate = searchParams.get('dta_inicio')
	const endDate = searchParams.get('dta_fim')

	const fetchReport = useCallback(async () => {
		const result = await salesApi.listSales(
			String(startDate),
			String(endDate),
			page,
		)

		if (result.data.length > 0)
			setReport({ data: result.data, meta: result.meta })
		else setReport({ data: [], meta: undefined })
	}, [endDate, startDate, page])

	useEffect(() => {
		fetchReport()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startDate, endDate, page])

	return (
		<Content>
			<section className="my-6">
				<div className="space-y-3">
					<h1 className="text-xl font-semibold">Relatório de vendas</h1>
					<DateFilter />
					<Separator />
				</div>

				{checkDates(startDate, endDate) && (
					<span className="my-6 flex h-full flex-col items-center justify-center">
						<p>Parâmetros inválidos.</p>
					</span>
				)}

				{report.data.length <= 0 && !checkDates(startDate, endDate) && (
					<span className="my-6 flex h-full flex-col items-center justify-center">
						<p>Nenhum registro encontrado.</p>
					</span>
				)}

				{report.data.length > 0 && !checkDates(startDate, endDate) && (
					<div className="my-4">
						<DynamicTable
							labelHead={[
								'Cod. Venda',
								'Cod. Cliente',
								'Val. Tot. Venda',
								'Nome',
								'Cidade',
								'UF',
								'Tel.',
							]}
						>
							{report.data.map((item) => (
								<ReportList key={item.cod_venda} {...item} />
							))}
						</DynamicTable>
					</div>
				)}
				{report.data.length > 0 &&
					report.meta &&
					!checkDates(startDate, endDate) && (
						<div className="flex w-full items-center justify-center border-t">
							<ButtonPagination meta={report.meta} />
						</div>
					)}
			</section>
		</Content>
	)
}
