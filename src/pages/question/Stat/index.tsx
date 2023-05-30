import React, { useState } from 'react'
import type { FC } from 'react'
import { Spin, Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'

const Stat: FC = () => {
	const nav = useNavigate()

	const { loading } = useLoadQuestionData()
	const { isPublished, title } = useGetPageInfo()

	// 状态提升selectedId、type
	const [selectedComponentId, setSeletedComponentId] = useState('')
	const [selectedComponentType, setSelectedComponentType] = useState('')

	useTitle(`问卷统计 —— ${title}`)

	const LoadingElem = (
		<div style={{ textAlign: 'center', marginTop: '60px' }}>
			<Spin />
		</div>
	)

	const genContentElem = () => {
		if (typeof isPublished === 'boolean' && !isPublished) {
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
		}

		return (
			<>
				<div className={styles.left}>
					<ComponentList
						selectedComponentId={selectedComponentId}
						setSelectedComponentId={setSeletedComponentId}
						setSelectedComponentType={setSelectedComponentType}
					/>
				</div>
				<div className={styles.main}>中</div>
				<div className={styles.right}>右</div>
			</>
		)
	}

	return (
		<div className={styles.container}>
			<StatHeader />
			<div className={styles['content-wrap']}>
				{loading && LoadingElem}
				{!loading && <div className={styles.content}>{genContentElem()}</div>}
			</div>
		</div>
	)
}

export default Stat
