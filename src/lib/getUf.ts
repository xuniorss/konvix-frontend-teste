import { UfProps } from '@/models/customers'
import axios from 'axios'

export const getUf = async () => {
	const { data } = await axios.get<UfProps[]>(import.meta.env.VITE_UF_URL)
	return data
}
