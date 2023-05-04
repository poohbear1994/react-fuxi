import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'

const { Title } = Typography
const Star: FC = () => {
	useTitle('星标问卷')
	const { data = {}, loading } = useLoadQuestionListData({
		isStar: true,
	})
	const { list = [], total = 0 } = data

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>星标问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{loading && (
					<div style={{ textAlign: 'center' }}>
						<Spin />
					</div>
				)}
				{!loading && list.length === 0 ? (
					<Empty description="暂无数据" />
				) : (
					list.map((q: any) => {
						const { _id, title, isPublished, isStart, answerCount, createdAt, isDeleted } = q
						return (
							<QuestionCard
								_id={_id}
								key={_id}
								title={title}
								isPublished={isPublished}
								isStar={isStart}
								answerCount={answerCount}
								createdAt={createdAt}
								isDeleted={isDeleted}
							></QuestionCard>
						)
					})
				)}
			</div>
			<div className={styles.footer}>
				<ListPage total={total} />
			</div>
		</>
	)
}

export default Star
