import React, { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRequest, useTitle } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { Form, Input, Space, Typography, Button, Checkbox, message } from 'antd'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router/index'
import { loginService } from '../services/user'
import styles from './Login.module.scss'

const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

const rememberUser = (username: string, password: string) => {
	localStorage.setItem(USERNAME_KEY, username)
	localStorage.setItem(PASSWORD_KEY, password)
}

const delUserFromStorage = () => {
	localStorage.removeItem(USERNAME_KEY)
	localStorage.removeItem(PASSWORD_KEY)
}

const getUserInfoFromStorage = () => {
	return {
		username: localStorage.getItem(USERNAME_KEY),
		password: localStorage.getItem(PASSWORD_KEY),
	}
}

const Login: FC = () => {
	useTitle('登录')
	const nav = useNavigate()

	const { run: login, loading: loginLoading } = useRequest(
		async (username: string, password: string) => {
			const data = await loginService(username, password)
			return data
		},
		{
			manual: true,
			onSuccess() {
				message.success('登录成功')
				nav(MANAGE_INDEX_PATHNAME)
			},
		}
	)

	const [form] = Form.useForm() // Form组件提供的 第三方hook

	useEffect(() => {
		const { username, password } = getUserInfoFromStorage()
		form.setFieldsValue({ username, password })
	}, [])

	const onFinish = (values: any) => {
		const { remember, username, password } = values
		login(username, password)
		if (remember) {
			rememberUser(username, password)
		} else {
			delUserFromStorage()
		}
	}

	return (
		<div className={styles.container}>
			<div>
				<Space>
					<Title level={2}>
						<UserOutlined />
					</Title>
					<Title level={2}>用户登录</Title>
				</Space>
			</div>
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				form={form}
			>
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
				<Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
					<Input.Password />
				</Form.Item>
				<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
					<Checkbox>记住我？</Checkbox>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Space>
						<Button type="primary" htmlType="submit" loading={loginLoading}>
							登录
						</Button>
						<Link to={REGISTER_PATHNAME}>注册新用户</Link>
					</Space>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login
