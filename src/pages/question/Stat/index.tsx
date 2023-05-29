import React, { FC } from 'react'
import { Spin, Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const Stat: FC = () => {
	const nav = useNavigate()

	const { loading } = useLoadQuestionData()
	const { isPublished, title } = useGetPageInfo()
	useTitle(`问卷统计 —— ${title}`)

	if (loading)
		return (
			<div style={{ textAlign: 'center', marginTop: '60px' }}>
				<Spin />
			</div>
		)
	if (!isPublished)
		return (
			<div style={{ flex: 1 }}>
				<Result
					status="warning"
					title="该页面尚未发布"
					extra={
						<Button
							type="primary"
							onClick={() => {
								nav(-1)
							}}
						>
							返回
						</Button>
					}
				/>
			</div>
		)

	return (
		<div>
			<div>Stat Page</div>
		</div>
	)
}

export default Stat
