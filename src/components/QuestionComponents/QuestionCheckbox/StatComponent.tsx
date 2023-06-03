import React from 'react'
import type { FC } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import type { QuestionCheckboxStatPropsType } from './interface'

const StatComponent: FC<QuestionCheckboxStatPropsType> = props => {
	const { stat } = props

	return (
		<div
			style={{
				width: '300px',
				height: '400px',
			}}
		>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					width={500}
					height={300}
					data={stat}
					margin={{
						top: 5,
						right: 0,
						left: 0,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="count" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default StatComponent
