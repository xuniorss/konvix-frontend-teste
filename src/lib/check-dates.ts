export const checkDates = (
	startDate: string | null,
	endDate: string | null,
): boolean =>
	startDate !== null &&
	endDate !== null &&
	(endDate < startDate || startDate > endDate)
