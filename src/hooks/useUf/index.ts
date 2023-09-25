import { getUf } from '@/lib/getUf'
import { UfProps } from '@/models/customers'
import { useCallback, useEffect, useState } from 'react'

export const useUf = () => {
	const [ufData, setUfData] = useState<UfProps[]>([])

	const uf = useCallback(async () => {
		setUfData(await getUf())
	}, [])

	useEffect(() => {
		uf()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return { ufData }
}
