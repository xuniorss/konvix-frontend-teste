import { create } from 'zustand'

type StateProps = {
	page: number
}

type ActionsProps = {
	setPage: (page: number) => void
}

export const usePagination = create<StateProps & ActionsProps>((set) => ({
	page: 1,
	setPage: (page) => set({ page }),
}))
