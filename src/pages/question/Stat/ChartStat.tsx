import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentConfigByType } from '../../../components/QuestionComponents'
import { getComponentStatService } from '../../../services/stat'

const { Title } = Typography

type PropsType = {
	selectedComponentId: string
	selectedComponentType: string
}

const ChartStat: FC<PropsType> = props => {
	const { selectedComponentId, selectedComponentType } = props
	const { id: questionId = '' } = useParams()

	const [stat, setstat] = useState([])

	const { run } = useRequest(
		async (questionId: string, componentId: string) => {
			const data = await getComponentStatService(questionId, componentId)
			return data
		},
		{
			manual: true,
			onSuccess(res) {
				setstat(res.stat)
			},
		}
	)

	useEffect(() => {
		if (selectedComponentId) run(questionId, selectedComponentId)
	}, [questionId, selectedComponentId])

	const getStatElem = () => {
		if (!selectedComponentId) return <div>未选中组件</div>
		const { StatComponent } = getComponentConfigByType(selectedComponentType) || {}
		if (StatComponent == null) return <div>该组件无统计图表</div>
		if (StatComponent) return <StatComponent stat={stat} />
	}

	return (
		<>
			<Title level={3}>图表统计</Title>
			{getStatElem()}
		</>
	)
}

export default ChartStat
