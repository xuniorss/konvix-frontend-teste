import { ReactNode } from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'

interface DynamicTableProps {
	labelHead: Array<string>
	children: ReactNode
}

export const DynamicTable = ({ labelHead, children }: DynamicTableProps) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{Array.from({ length: labelHead.length }).map((_, idx) => (
						<TableHead key={idx}>{labelHead[idx]}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>{children}</TableBody>
		</Table>
	)
}
