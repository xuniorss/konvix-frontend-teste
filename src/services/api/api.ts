import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get(import.meta.env.VITE_COOKIES)

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: { Authorization: `Bearer ${token}` },
})

export { api }
