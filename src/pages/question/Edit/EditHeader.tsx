import React, { useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { Button, Typography, Space, Input, message } from 'antd'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import EditToolbar from './EditToolbar'
import styles from './EditHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { updateQuestionService } from '../../../services/question'

const { Title } = Typography

// 保存
const SaveButton: FC = () => {
	const { id } = useParams()
	const { componentList } = useGetComponentInfo()
	const pageInfo = useGetPageInfo()

	const { loading, run: save } = useRequest(
		async () => {
			if (!id) return
			await updateQuestionService(id, { ...pageInfo, componentList })
		},
		{
			manual: true,
			onSuccess() {
				message.success('更新成功')
			},
		}
	)

	// 保存快捷键操作
	useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
		event.preventDefault()
		if (!loading) save()
	})

	// 自动保存
	useDebounceEffect(save, [componentList, pageInfo], { wait: 1000 })

	return (
		<Button onClick={save} loading={loading}>
			保存
		</Button>
	)
}

// 发布
const PublishButton: FC = () => {
	const nav = useNavigate()
	const { id } = useParams()
	const { componentList } = useGetComponentInfo()
	const pageInfo = useGetPageInfo()

	const { loading, run: publish } = useRequest(
		async () => {
			if (!id) return
			await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true })
		},
		{
			manual: true,
			onSuccess() {
				message.success('发布成功, 跳转到统计页面')
				nav('/question/stat/' + id)
			},
		}
	)

	return (
		<Button type="primary" loading={loading} onClick={publish}>
			发布
		</Button>
	)
}

// 显示和修改标题
const TitleElem: FC = () => {
	const dispatch = useDispatch()
	const { title } = useGetPageInfo()

	const [editState, setEditState] = useState(false)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newTitle = event.target.value
		dispatch(changePageTitle(newTitle))
	}

	if (editState) {
		return (
			<Input
				value={title}
				onChange={handleChange}
				onPressEnter={() => {
					setEditState(false)
				}}
				onBlur={() => {
					setEditState(false)
				}}
			/>
		)
	}

	return (
		<Space>
			<Title>{title}</Title>
			<Button
				icon={<EditOutlined />}
				type="text"
				onClick={() => {
					setEditState(true)
				}}
			/>
		</Space>
	)
}

// 编辑器头部
const EditHeader: FC = () => {
	const nav = useNavigate()

	return (
		<div className={styles['header-wrapper']}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button
							type="link"
							icon={<LeftOutlined />}
							onClick={() => {
								nav(-1)
							}}
						>
							返回
						</Button>
						<TitleElem />
					</Space>
				</div>
				<div className={styles.main}>
					<EditToolbar />
				</div>
				<div className={styles.right}>
					<Space>
						<SaveButton />
						<PublishButton />
					</Space>
				</div>
			</div>
		</div>
	)
}

export default EditHeader
