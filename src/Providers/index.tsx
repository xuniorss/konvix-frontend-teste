import { ReactNode } from 'react'
import { ModalProvider } from './modal-provider'
import { QueryProvider } from './query-client'

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<QueryProvider>
				<ModalProvider />
				{children}
			</QueryProvider>
		</>
	)
}
