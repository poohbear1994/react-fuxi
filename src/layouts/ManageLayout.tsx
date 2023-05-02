import React, { useState } from 'react'
import type { FC } from 'react'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { createQuestionService } from '../services/question'

const ManageLayout: FC = () => {
	const nav = useNavigate()
	// 获取路由path
	const { pathname } = useLocation()

	const [loading, setLoading] = useState(false)
	const handleCreateClick = async () => {
		setLoading(true)

		const data = await createQuestionService()
		const { id } = data || {}
		if (id) {
			nav(`/question/edit/${id}`)
			message.success('创建成功')
		}

		setLoading(false)
	}

	return (
		<>
			<div className={styles.container}>
				<div className={styles.left}>
					<Space direction="vertical">
						<Button
							type="primary"
							size="large"
							icon={<PlusOutlined />}
							onClick={handleCreateClick}
							loading={loading}
						>
							创建问卷
						</Button>
						<Divider style={{ borderTop: 'transparent' }} />
						<Button
							type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
							size="large"
							icon={<BarsOutlined />}
							onClick={() => nav('/manage/list')}
						>
							我的问卷
						</Button>
						<Button
							type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
							size="large"
							icon={<StarOutlined />}
							onClick={() => nav('/manage/star')}
						>
							星标问卷
						</Button>
						<Button
							type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
							size="large"
							icon={<DeleteOutlined />}
							onClick={() => nav('/manage/trash')}
						>
							回收站
						</Button>
					</Space>
				</div>
				<div className={styles.right}>
					<Outlet></Outlet>
				</div>
			</div>
		</>
	)
}

export default ManageLayout
