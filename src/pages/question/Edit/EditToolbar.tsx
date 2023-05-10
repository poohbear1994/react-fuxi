import React from 'react'
import type { FC } from 'react'
import { Button, Tooltip, Space } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const EditToolbar: FC = () => {
	const handleDelete = () => {
		console.info('delete')
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
