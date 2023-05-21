import React, { useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { Button, Typography, Space, Input } from 'antd'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import EditToolbar from './EditToolbar'
import styles from './EditHeader.module.scss'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { changePageTitle } from '../../../store/pageInfoReducer'

const { Title } = Typography

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
						<Button>保存</Button>
						<Button type="primary">发布</Button>
					</Space>
				</div>
			</div>
		</div>
	)
}

export default EditHeader
