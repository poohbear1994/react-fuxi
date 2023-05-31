import React, { useState } from 'react'
import type { FC } from 'react'
import { Spin, Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getQuestionStatListService } from '../../../services/stat'

type PropsType = {
	selectedComponentId: string
	setSelectedComponentId: (id: string) => void
	setSelectedComponentType: (type: string) => void
}

const { Title } = Typography

const PageStat: FC<PropsType> = props => {
	const { selectedComponentId } = props

	const { id: questionId = '' } = useParams()

	const [total, setTotal] = useState(0)
	const [list, setList] = useState([])

	const { loading } = useRequest(
		async () => {
			const params = {
				page: 1,
				pageSize: 10,
			}
			const data = await getQuestionStatListService(questionId, params)
			return data
		},
		{
			onSuccess(result) {
				const { total, list = [] } = result
				setTotal(total)
				setList(list)
			},
		}
	)

	return (
		<div>
			<Title level={3}>答卷数量： {!loading && total}</Title>
			{loading && (
				<div style={{ textAlign: 'center' }}>
					<Spin />
				</div>
			)}
		</div>
	)
}

export default PageStat
