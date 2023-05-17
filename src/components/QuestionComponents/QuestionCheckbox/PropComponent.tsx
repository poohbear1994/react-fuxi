import React, { useEffect } from 'react'
import type { FC } from 'react'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { nanoid } from '@reduxjs/toolkit'
import type { QuestionCheckboxPropsType, OptionType } from './interface'

const Component: FC<QuestionCheckboxPropsType> = props => {
	const { title, isVertical, list = [], onChange, disabled } = props

	const [form] = Form.useForm()

	useEffect(() => {
		form.setFieldsValue({ title, isVertical, list })
	}, [title, isVertical, list])

	const handleValuesChange = () => {
		if (!onChange) return
		const newValues: QuestionCheckboxPropsType = form.getFieldsValue()

		if (newValues.list) {
			newValues.list = newValues.list.filter(opt => !(opt.text == null))
		}

		const { list = [] } = newValues
		list.forEach(opt => {
			if (opt.value) return
			opt.value = nanoid(5) // 补全新增的opt的 value
		})
		onChange(newValues)
	}

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={{ title, isVertical, list }}
			onValuesChange={handleValuesChange}
			disabled={disabled}
		>
			<Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入问卷标题' }]}>
				<Input placeholder={'请输入标题'} />
			</Form.Item>
			<Form.Item label="选项">
				<Form.List name="list">
					{(fields, { add, remove }) => {
						return (
							<>
								{/* 遍历所有的选项（可删除） */}
								{fields.map(({ key, name }, index) => {
									return (
										<Space key={key} align="baseline">
											<Form.Item name={[name, 'checked']} valuePropName="checked">
												<Checkbox />
											</Form.Item>
											{/* 当前选项 输入框 */}
											<Form.Item
												name={[name, 'text']}
												rules={[
													{ required: true, message: '请输入选项文字' },
													{
														validator: (_, text) => {
															const list = form.getFieldValue('list')
															let num = 0
															list.forEach((opt: OptionType) => {
																if (opt.text === text) num++ // 记录text相同的个数，预期只有1个（自己）
															})
															if (num === 1) return Promise.resolve()
															return Promise.reject(new Error('和其他选项重复了'))
														},
													},
												]}
											>
												<Input placeholder="请输入选项文字" />
											</Form.Item>

											{/* 当前选项 删除按钮 */}

											{index > 0 && (
												<MinusCircleOutlined
													onClick={() => {
														remove(name)
													}}
												/>
											)}
										</Space>
									)
								})}

								{/* 添加选项 */}
								<Form.Item>
									<Button
										type="link"
										block
										icon={<PlusOutlined />}
										onClick={() => add({ text: '', value: '' })}
									>
										添加选项
									</Button>
								</Form.Item>
							</>
						)
					}}
				</Form.List>
			</Form.Item>
			<Form.Item name="isVertical" valuePropName="checked">
				<Checkbox>竖向排列</Checkbox>
			</Form.Item>
		</Form>
	)
}

export default Component
