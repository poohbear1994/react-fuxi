import React from 'react'
import type { FC } from 'react'
import { Button, Tooltip, Space } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLock,
} from '../../../store/componentsReducer/index'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
	const dispatch = useDispatch()

	const { selectedId, selectedComponent } = useGetComponentInfo()
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
		</Space>
	)
}

export default EditToolbar
