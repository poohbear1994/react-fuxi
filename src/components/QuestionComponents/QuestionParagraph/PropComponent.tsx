import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Form, Input, Checkbox } from 'antd'
import type { QuestionParagraphPropsType } from './interface'

const { TextArea } = Input

const PropComponent: FC<QuestionParagraphPropsType> = props => {
	const { text, isCenter, onChange, disabled } = props
	const [form] = Form.useForm()

	useEffect(() => {
		form.setFieldsValue({ text, isCenter })
	}, [text, isCenter])

	const handleValueChange = () => {
		if (onChange) onChange(form.getFieldsValue())
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{ text, isCenter }}
			onChange={handleValueChange}
			disabled={disabled}
		>
			<Form.Item
				label="段落内容"
				name="text"
				rules={[{ required: true, message: '请输入段落内容' }]}
			>
				<TextArea />
			</Form.Item>
			<Form.Item name="isCenter" valuePropName="checked">
				<Checkbox>居中显示</Checkbox>
			</Form.Item>
		</Form>
	)
}

export default PropComponent
