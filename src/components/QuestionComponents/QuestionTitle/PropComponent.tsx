import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Form, Input, Checkbox, Select } from 'antd'
import type { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = props => {
	const { text, level, isCenter } = props
	const [form] = Form.useForm()

	// 监听属性变化，重设表单值
	useEffect(() => {
		form.setFieldsValue({ text, level, isCenter })
	}, [text, level, isCenter])

	return (
		<Form layout="vertical" initialValues={{ text, level, isCenter }}>
			<Form.Item label="标题内容" name="title" rules={[{ required: true, message: ' 请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="层级" name="level">
				<Select
					options={[
						{ value: 1, text: 1 },
						{ value: 2, text: 2 },
						{ value: 3, text: 3 },
					]}
				/>
			</Form.Item>
			<Form.Item name="isCenter" valuePropName="checked">
				<Checkbox>居中显示</Checkbox>
			</Form.Item>
		</Form>
	)
}

export default PropComponent