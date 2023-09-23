export const formatPhoneNumber = (value: string) => {
	const cleanedValue = value.replace(/\D/g, '')
	const match = cleanedValue.match(/^(\d{0,2})(\d{0,4})(\d{0,4})$/)

	if (match) {
		const formattedValue = `(${match[1] || ''}${match[2] ? ') ' : ''}${
			match[2] || ''
		}${match[3] ? '-' : ''}${match[3] || ''}`
		return formattedValue
	}

	return ''
}
