export const InfoItem = ({
	label,
	text,
}: {
	label: string
	text: string | number
}) => {
	return (
		<p className="text-sm">
			<strong>{label} </strong>
			{text}
		</p>
	)
}
