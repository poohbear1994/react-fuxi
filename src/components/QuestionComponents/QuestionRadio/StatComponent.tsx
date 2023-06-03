import React, { useMemo } from 'react'
import type { FC } from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'
import { STAT_COLORS } from '../../../constant'
import type { QuestionRadioStatPropsType } from './interface'

/**
 * @description: 格式化为带%的字符串
 */
const format = (n: number) => {
	return (n * 100).toFixed(2)
}

const StatComponent: FC<QuestionRadioStatPropsType> = props => {
	const { stat = [] } = props

	/**
	 * @description: 数据求和
	 */
	const sum = useMemo(() => {
		let s = 0
		stat.forEach(i => (s += i.count))
		return s
	}, [stat])

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
						dataKey="count"
						data={stat}
						cx="50%"
						cy="50%"
						outerRadius={50}
						fill="#8884d8"
						label={i => `${i.name}:${i.count} - ${format(i.count / sum)}%`}
					>
						{stat.map((item, index) => {
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

export default StatComponent
