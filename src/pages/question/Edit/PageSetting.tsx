import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'
import useGetPageInfo from '../../../hooks/useGetPageInfo'

const { TextArea } = Input

const PageSetting: FC = () => {
	const dispatch = useDispatch()

	const pageInfo = useGetPageInfo()

	useEffect(() => {
		form.setFieldsValue(pageInfo)
	}, [pageInfo])

	const [form] = Form.useForm()

	const handleValuesChange = () => {
		dispatch(resetPageInfo(form.getFieldsValue()))
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={pageInfo}
			onValuesChange={handleValuesChange}
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
				<Input placeholder="请输入标题" />
			</Form.Item>
			<Form.Item label="描述" name="desc">
				<TextArea placeholder="请输入问卷描述" />
			</Form.Item>
			<Form.Item label="css" name="css">
				<TextArea placeholder="请输入css样式代码" />
			</Form.Item>
			<Form.Item label="js" name="js">
				<TextArea placeholder="请输入js脚本代码" />
			</Form.Item>
		</Form>
	)
}

export default PageSetting
