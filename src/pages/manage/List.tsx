import React, { FC } from 'react'
import { Typography, Spin } from 'antd'
import { useTitle } from 'ahooks'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'

const { Title } = Typography

const List: FC = () => {
	useTitle('问卷-列表页')

	const { data: questionList = {}, loading } = useLoadQuestionListData()

	const { list = [] } = questionList

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>我的问卷</Title>
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
				{!loading &&
					list.length > 0 &&
					list.map((q: any) => {
						const { _id, title, isPublished, isStart, answerCount, createdAt } = q
						return (
							<QuestionCard
								_id={_id}
								key={_id}
								title={title}
								isPublished={isPublished}
								isStar={isStart}
								answerCount={answerCount}
								createdAt={createdAt}
							></QuestionCard>
						)
					})}
			</div>
			<div className={styles.footer}>loadMore 上划加载更多</div>
		</>
	)
}

export default List
