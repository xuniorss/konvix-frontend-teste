import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import { PaginationMeta } from '@/models/pagination'
import { Button } from '../ui/button'

export const ButtonPagination = ({ meta }: { meta: PaginationMeta }) => {
	const { page, setPage } = usePagination()

	const totalPages = Math.ceil(meta.total / meta.per_page)

	const pagesArray = Array.from({ length: totalPages }, (_, idx) => idx + 1)

	return pagesArray.map((pg) => (
		<Button
			onClick={() => setPage(pg)}
			variant="link"
			size="sm"
			className={cn(pg !== page && 'opacity-50')}
			key={pg}
		>
			{pg}
		</Button>
	))
}
