import React from 'react'
import type { FC } from 'react'
import { Button, Tooltip, Space } from 'antd'
import {
	DeleteOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	CopyOutlined,
	BlockOutlined,
	UpOutlined,
	DownOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLock,
	copySelectedComponent,
	pasteCopiedComponent,
	moveComponent,
} from '../../../store/componentsReducer/index'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
	const dispatch = useDispatch()

	const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo()
	const { isLocked } = selectedComponent || {}

	const length = componentList.length
	const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
	const isFirst = selectedIndex <= 0
	const isLast = selectedIndex + 1 >= length

	const handleDelete = () => {
		dispatch(removeSelectedComponent())
	}

	const handleHidden = () => {
		dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
	}

	const handleLock = () => {
		dispatch(toggleComponentLock({ fe_id: selectedId }))
	}

	const copy = () => {
		dispatch(copySelectedComponent())
	}

	const paste = () => {
		dispatch(pasteCopiedComponent())
	}

	const moveUp = () => {
		if (isFirst) return
		dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
	}

	const moveDown = () => {
		if (isLast) return
		dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
	}

	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
			</Tooltip>
			<Tooltip title="隐藏">
				<Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
			</Tooltip>
			<Tooltip title="锁定">
				<Button
					shape="circle"
					icon={<LockOutlined />}
					type={isLocked ? 'primary' : undefined}
					onClick={handleLock}
				/>
			</Tooltip>
			<Tooltip title="复制">
				<Button shape="circle" icon={<CopyOutlined />} onClick={copy} />
			</Tooltip>
			<Tooltip title="粘贴">
				<Button
					shape="circle"
					icon={<BlockOutlined />}
					disabled={!copiedComponent}
					onClick={paste}
				/>
			</Tooltip>
			<Tooltip title="上移">
				<Button shape="circle" icon={<UpOutlined />} disabled={isFirst} onClick={moveUp} />
			</Tooltip>
			<Tooltip title="下移">
				<Button shape="circle" icon={<DownOutlined />} disabled={isLast} onClick={moveDown} />
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
