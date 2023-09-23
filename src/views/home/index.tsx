import { CardNavigation } from '@/components/CardNavigation'
import { Content } from '@/components/Content'
import { navigationRoutes } from '@/constants/navigation'

export const HomePage = () => {
	return (
		<Content className="center">
			<section className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{navigationRoutes.map((route) => (
					<CardNavigation key={route.href} {...route} />
				))}
			</section>
		</Content>
	)
}
