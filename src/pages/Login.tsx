import React, { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { Form, Input, Space, Typography, Button, Checkbox } from 'antd'
import { REGISTER_PATHNAME } from '../router/index'
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
	const [form] = Form.useForm() // Form组件提供的 第三方hook

	useEffect(() => {
		const { username, password } = getUserInfoFromStorage()
		form.setFieldsValue({ username, password })
	}, [])

	const onFinish = (values: any) => {
		const { remember, username, password } = values
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
				<Form.Item label="用户名" name="username">
					<Input />
				</Form.Item>
				<Form.Item label="密码" name="password">
					<Input.Password />
				</Form.Item>
				<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
					<Checkbox>记住我？</Checkbox>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Space>
						<Button type="primary" htmlType="submit">
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
