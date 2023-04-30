import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag } from 'antd'
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
		isStart: true,
		answerCount: 2,
		createdAt: '3月12日 13:23',
	},
]

const { Title } = Typography

const Trash: FC = () => {
	useTitle('回收站')

	const [questionList, setQuestionList] = useState(rawQuestionList)

	const tableColumns = [
		{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: '是否发布',
			dataIndex: 'isPublished',
			render: (isPublished: boolean) => {
				return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
			},
			key: 'isPublished',
		},
		{
			title: '答卷',
			dataIndex: 'answerCount',
			key: 'answerCount',
		},
		{
			title: '创建时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
	]

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>回收站</Title>
				</div>
				<div className={styles.right}>（搜索）</div>
			</div>
			<div className={styles.content}>
				{questionList.length === 0 ? (
					<Empty description="暂无数据" />
				) : (
					<Table dataSource={questionList} columns={tableColumns} pagination={false} />
				)}
			</div>
			<div className={styles.footer}>分页</div>
		</>
	)
}

export default Trash
