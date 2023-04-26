import React, { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'

const rawQuestionList = [
	{
		_id: crypto.randomUUID(),
		title: '问卷1',
		isPublished: false,
		isStart: false,
		answerCount: 5,
		createdAt: '3月10日 13:23',
	},
	{
		_id: crypto.randomUUID(),
		title: '问卷2',
		isPublished: true,
		isStart: true,
		answerCount: 999,
		createdAt: '3月11日 13:23',
	},
	{
		_id: crypto.randomUUID(),
		title: '问卷3',
		isPublished: false,
		isStart: false,
		answerCount: 2,
		createdAt: '3月12日 13:23',
	},
	{
		_id: crypto.randomUUID(),
		title: '问卷4',
		isPublished: true,
		isStart: true,
		answerCount: 8,
		createdAt: '3月13日 13:23',
	},
]

const List: FC = () => {
	const [searchParams] = useSearchParams()
	console.dir(searchParams.get('a'))

	const [questionList, setQuestionList] = useState(rawQuestionList)

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<h3>我的问卷</h3>
				</div>
				<div className={styles.right}>（搜索）</div>
			</div>
			<div className={styles.content}>
				{questionList.length > 0 &&
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
					})}
			</div>
			<div className={styles.footer}>loadMore 上划加载更多</div>
		</>
	)
}

export default List
