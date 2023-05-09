import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Form, Input } from 'antd'
import type { QuestionInputPropsType } from './interface'

const PropComponent: FC<QuestionInputPropsType> = props => {
	const { title, placeholder, onChange } = props
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
