import React from 'react'
import type { FC } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'

const RightPanel: FC = () => {
	const tabsItems: TabsProps['items'] = [
		{
			key: 'prop',
			label: (
				<span>
					<FileTextOutlined />
					属性
				</span>
			),
			children: <ComponentProp />,
		},
		{
			key: 'layers',
			label: (
				<span>
					<SettingOutlined />
					页面设置
				</span>
			),
			children: <div>页面设置</div>,
		},
	]

	return <Tabs defaultActiveKey="componentLib" items={tabsItems} />
}

export default RightPanel
