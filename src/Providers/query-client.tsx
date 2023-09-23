import { queryClient } from '@/services/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export const QueryProvider = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
