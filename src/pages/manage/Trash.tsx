import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import ListPage from '../../components/ListPage'
import { updateQuestionService } from '../../services/question'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
	useTitle('回收站')

	const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
	const { list = [], total = 0 } = data

	const [selectedIds, setSelectedIds] = useState<React.Key[]>([])

	const { run: recover, loading: recoverLoading } = useRequest(
		async () => {
			// for await of 有序发送请求
			for await (const id of selectedIds) {
				await updateQuestionService(id as string, { isDeleted: false })
			}
		},
		{
			manual: true,
			debounceWait: 500,
			onSuccess() {
				message.success('恢复成功')
				refresh() // 手动刷新列表
			},
		}
	)

	const del = () => {
		confirm({
			title: '确定删除选中问卷？',
			icon: <ExclamationCircleOutlined />,
			content: '删除以后无法找回',
			onOk() {
				alert(`删除${JSON.stringify(selectedIds)}`)
			},
		})
	}

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

	// 将JSX定义为变量
	const TableElem = (
		<>
			<div
				style={{
					marginBottom: '16px',
				}}
			>
				<Space>
					<Button
						type="primary"
						disabled={selectedIds.length === 0}
						loading={recoverLoading}
						onClick={recover}
					>
						恢复
					</Button>
					<Button danger disabled={selectedIds.length === 0} onClick={del}>
						彻底删除
					</Button>
				</Space>
			</div>
			<Table
				dataSource={list}
				columns={tableColumns}
				pagination={false}
				rowKey={q => q._id}
				rowSelection={{
					type: 'checkbox',
					onChange(selectedRowKeys) {
						setSelectedIds(selectedRowKeys)
					},
				}}
			/>
		</>
	)

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>回收站</Title>
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
				{!loading && list.length === 0 && <Empty description="暂无数据" />}
				{list.length > 0 && TableElem}
			</div>
			<div className={styles.footer}>
				<ListPage total={total} />
			</div>
		</>
	)
}

export default Trash
