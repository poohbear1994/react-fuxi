import React from 'react'
import type { FC } from 'react'
import { Typography } from 'antd'
import PieDemo from './PieDemo'
import BarDemo from './BarDemo'

const { Title } = Typography

type PropsType = {
	selectedComponentId: string
	selectedCOmponentType: string
}

const ChartStat: FC<PropsType> = props => {
	const { selectedComponentId, selectedCOmponentType } = props

	return (
		<>
			<Title level={3}>图表统计</Title>
			<PieDemo />
			<BarDemo />
		</>
	)
}

export default ChartStat
