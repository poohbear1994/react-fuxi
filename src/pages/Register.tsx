import React from 'react'
import type { FC } from 'react'
import { useRequest, useTitle } from 'ahooks'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.scss'
import { LOGIN_PATHNAME } from '../router/index'
import { registerService } from '../services/user'

const { Title } = Typography

const Register: FC = () => {
	useTitle('注册')
	const nav = useNavigate()

	const { run: register, loading: registerLoading } = useRequest(
		async (values: any) => {
			const { username, password, nickname } = values
			const data = await registerService(username, password, nickname)
			return data
		},
		{
			manual: true,
			onSuccess() {
				message.success('注册成功')
				nav(LOGIN_PATHNAME)
			},
		}
	)

	const onFinish = (values: any) => {
		register(values)
	}

	return (
		<div className={styles.container}>
			<div>
				<Space>
					<Title level={2}>
						<UserAddOutlined></UserAddOutlined>
					</Title>
					<Title level={2}>注册新用户</Title>
				</Space>
			</div>
			<div>
				<Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
					<Form.Item
						label="用户名"
						name="username"
						rules={[
							{ required: true, message: '请输入用户名' },
							{ type: 'string', min: 5, max: 20, message: '字符长度在5-20之间' },
							{ pattern: /^\w+$/, message: '只能是字母、数字、下划线' },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="昵称" name="nickname">
						<Input />
					</Form.Item>
					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码' }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="确认密码"
						name="confirm"
						dependencies={['password']} // 依赖于 password，pwssword变化会重新触发validator验证
						rules={[
							{ required: true, message: '请确认密码' },
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve()
									} else {
										return Promise.reject(new Error('两次密码不一致'))
									}
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
						<Space>
							<Button type="primary" htmlType="submit" loading={registerLoading}>
								注册
							</Button>
							<Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default Register
