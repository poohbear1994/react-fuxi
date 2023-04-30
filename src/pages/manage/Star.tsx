import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'

const rawQuestionList = [
	{
		_id: crypto.randomUUID(),
		title: '问卷1',
		isPublished: false,
		isStart: true,
		answerCount: 5,
		createdAt: '3月10日 13:23',
	},
	// {
	// 	_id: crypto.randomUUID(),
	// 	title: '问卷2',
	// 	isPublished: true,
	// 	isStart: true,
	// 	answerCount: 999,
	// 	createdAt: '3月11日 13:23',
	// },
	// {
	// 	_id: crypto.randomUUID(),
	// 	title: '问卷3',
	// 	isPublished: false,
	// 	isStart: true,
	// 	answerCount: 2,
	// 	createdAt: '3月12日 13:23',
	// },
]

const { Title } = Typography
const Star: FC = () => {
	useTitle('星标问卷')
	const [questionList, setQuestionList] = useState(rawQuestionList)

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>星标问卷</Title>
				</div>
				<div className={styles.right}>（搜索）</div>
			</div>
			<div className={styles.content}>
				{questionList.length === 1 ? (
					<Empty description="暂无数据" />
				) : (
					questionList.map(q => {
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
					})
				)}
			</div>
			<div className={styles.footer}>分页</div>
		</>
	)
}

export default Star
