import { cn } from '@/lib/utils'
import { PaginationMeta } from '@/models/pagination'
import { usePagination } from '@/store/pagination'
import { Button } from '../ui/button'

export const ButtonPagination = ({ meta }: { meta: PaginationMeta }) => {
	const { page, setPage } = usePagination()

	const pagesArray = Array.from({ length: meta.total }, (_, idx) => idx + 1)

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
