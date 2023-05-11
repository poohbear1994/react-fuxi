import React from 'react'
import type { FC } from 'react'
import { Button, Tooltip, Space } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import {
	removeSelectedComponent,
	changeComponentHidden,
} from '../../../store/componentsReducer/index'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
	const dispatch = useDispatch()

	const { selectedId } = useGetComponentInfo()

	const handleDelete = () => {
		dispatch(removeSelectedComponent())
	}

	const handleHidden = () => {
		dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
	}

	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
			</Tooltip>
			<Tooltip title="隐藏">
				<Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} />
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
