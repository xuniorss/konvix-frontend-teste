import { ReactNode } from 'react'
import { QueryProvider } from './query-client'

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<QueryProvider>{children}</QueryProvider>
		</>
	)
}
