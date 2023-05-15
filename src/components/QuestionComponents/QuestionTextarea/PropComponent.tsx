import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Form, Input } from 'antd'
import type { QuestionTextareaPropsType } from './interface'

const PropComponent: FC<QuestionTextareaPropsType> = props => {
	const { title, placeholder, onChange, disabled } = props
	const [form] = Form.useForm()

	useEffect(() => {
		form.setFieldsValue({ title, placeholder })
	}, [title, placeholder])

	const handleValueChange = () => {
		if (onChange) onChange(form.getFieldsValue())
	}
	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{ title, placeholder }}
			onChange={handleValueChange}
			disabled={disabled}
		>
			<Form.Item label="标题内容" name="title" rules={[{ required: true, message: ' 请输入标题' }]}>
				<Input />
			</Form.Item>
			<Form.Item label="placeholder内容" name="placeholder">
				<Input />
			</Form.Item>
		</Form>
	)
}

export default PropComponent
