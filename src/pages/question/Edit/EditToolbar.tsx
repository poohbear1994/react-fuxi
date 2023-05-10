import React from 'react'
import type { FC } from 'react'
import { Button, Tooltip, Space } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { removeSelectedComponent } from '../../../store/componentsReducer/index'

const EditToolbar: FC = () => {
	const dispatch = useDispatch()

	const handleDelete = () => {
		dispatch(removeSelectedComponent())
	}

	return (
		<Space>
			<Tooltip title="删除">
				<Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
			</Tooltip>
		</Space>
	)
}

export default EditToolbar
