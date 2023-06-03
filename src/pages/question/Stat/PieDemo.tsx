import React from 'react'
import type { FC } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import { STAT_COLORS } from '../../../constant'

const data01 = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
	{ name: 'Group E', value: 278 },
	{ name: 'Group F', value: 189 },
]

const PieDemo: FC = () => {
	return (
		<div
			style={{
				width: '300px',
				height: '400px',
			}}
		>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						dataKey="value"
						data={data01}
						cx="50%"
						cy="50%"
						outerRadius={50}
						fill="#8884d8"
						label={i => `${i.name}:${i.value}`}
					>
						{data01.map((item, index) => {
							return <Cell key={item.name} fill={STAT_COLORS[index]} />
						})}
						<Legend />
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default PieDemo
