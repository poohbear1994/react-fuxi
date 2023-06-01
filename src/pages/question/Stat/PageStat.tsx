import React, { useState } from 'react'
import type { FC } from 'react'
import { Spin, Typography, Table, Pagination } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getQuestionStatListService } from '../../../services/stat'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

type PropsType = {
	selectedComponentId: string
	setSelectedComponentId: (id: string) => void
	setSelectedComponentType: (type: string) => void
}

const { Title } = Typography

const PageStat: FC<PropsType> = props => {
	const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

	const { id: questionId = '' } = useParams()

	const { componentList } = useGetComponentInfo()

	const columns = componentList.map(c => {
		const { title, fe_id, props, type } = c
		const columnTitle = props!.title || title

		return {
			title: (
				<div
					style={{ cursor: 'pointer' }}
					onClick={() => {
						setSelectedComponentId(fe_id)
						setSelectedComponentType(type)
					}}
				>
					{fe_id === selectedComponentId && <span style={{ color: '#1890ff' }}>{columnTitle}</span>}
					{fe_id !== selectedComponentId && <span>{columnTitle}</span>}
				</div>
			),
			dataIndex: fe_id,
		}
	})

	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [total, setTotal] = useState(0)
	const [list = [], setList] = useState<Array<any>>([])

	const { loading } = useRequest(
		async () => {
			const params = {
				page,
				pageSize,
			}
			const data = await getQuestionStatListService(questionId, params)
			return data
		},
		{
			refreshDeps: [page, pageSize, questionId], // 当依赖变化时，自动发起请求
			onSuccess(result) {
				const { total, list = [] } = result
				setTotal(total)
				setList(list)
			},
		}
	)

	const TableElem = (
		<>
			<Table columns={columns} dataSource={list} pagination={false} rowKey={q => q._id} />
			<div style={{ textAlign: 'center', marginTop: '18px' }}>
				<Pagination
					total={total}
					pageSize={pageSize}
					current={page}
					onChange={page => setPage(page)}
					onShowSizeChange={(page, pageSize) => {
						setPage(page)
						setPageSize(pageSize)
					}}
				/>
			</div>
		</>
	)

	return (
		<div>
			<Title level={3}>答卷数量： {!loading && total}</Title>
			{loading && (
				<div style={{ textAlign: 'center' }}>
					<Spin />
				</div>
			)}
			{!loading && TableElem}
		</div>
	)
}

export default PageStat
