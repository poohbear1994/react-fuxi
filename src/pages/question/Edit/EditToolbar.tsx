import React from 'react'
import type { FC } from 'react'
import { Button, Tooltip, Space } from 'antd'
import {
	DeleteOutlined,
	EyeInvisibleOutlined,
	LockOutlined,
	CopyOutlined,
	BlockOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLock,
	copySelectedComponent,
	pasteCopiedComponent,
} from '../../../store/componentsReducer/index'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
	const dispatch = useDispatch()

	const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
	const { isLocked } = selectedComponent || {}

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
		</Space>
	)
}

export default EditToolbar
