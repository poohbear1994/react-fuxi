import React, { useState } from 'react'
import type { FC } from 'react'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import {
	EditOutlined,
	LineChartOutlined,
	StarOutlined,
	CopyOutlined,
	DeleteOutlined,
	ExceptionOutlined,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { useRequest } from 'ahooks'
import styles from './QuestionCard.module.scss'
import { updateQuestionService } from '../services/question'

type PropsType = {
	_id: string
	title: string
	isPublished: boolean
	isStar: boolean
	answerCount: number
	createdAt: string
}

const { confirm } = Modal

const QuestionCard: FC<PropsType> = props => {
	const { _id, title, isPublished, answerCount, createdAt, isStar } = props
	const nav = useNavigate()

	const [isStarState, setIsStarState] = useState(isStar)

	const { run: changeStar, loading: changeStarLoading } = useRequest(
		async () => {
			const data = await updateQuestionService(_id, { isStar: !isStar })
			return data
		},
		{
			manual: true,
			onSuccess() {
				setIsStarState(!isStarState)
				message.success('已更新')
			},
		}
	)

	const duplicate = () => {
		message.success('复制成功')
	}

	const del = () => {
		confirm({
			title: '确定删除该问卷？',
			icon: <ExceptionOutlined />,
			onOk: () => {
				message.success('删除成功')
			},
		})
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.left}>
					<Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
						<Space>
							{isStarState && <StarOutlined style={{ color: 'red' }} />}
							{title}
						</Space>
					</Link>
				</div>
				<div className={styles.right}>
					<Space>
						{isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
						<span>答卷：{answerCount}</span>
						<span>{createdAt}</span>
					</Space>
				</div>
			</div>
			<Divider style={{ marginTop: '12px' }} />
			<div className={styles['button-container']}>
				<div className={styles.left}>
					<Space>
						<Button
							type="text"
							size="small"
							icon={<EditOutlined />}
							onClick={() => nav(`/question/edit/${_id}`)}
						>
							编辑问卷
						</Button>
						<Button
							type="text"
							size="small"
							icon={<LineChartOutlined />}
							onClick={() => nav(`/question/stat/${_id}`)}
							disabled={!isPublished}
						>
							问卷统计
						</Button>
					</Space>
				</div>
				<div className={styles.right}>
					<Space>
						<Button
							type="text"
							size="small"
							icon={<StarOutlined />}
							onClick={changeStar}
							loading={changeStarLoading}
						>
							{isStarState ? '取消标星' : '标星'}
						</Button>
						<Popconfirm
							title="确定复制该问卷？"
							okText="确定"
							cancelText="取消"
							onConfirm={duplicate}
						>
							<Button type="text" size="small" icon={<CopyOutlined />}>
								复制
							</Button>
						</Popconfirm>
						<Button type="text" size="small" icon={<DeleteOutlined />} onClick={del}>
							删除
						</Button>
					</Space>
				</div>
			</div>
		</div>
	)
}

export default QuestionCard
