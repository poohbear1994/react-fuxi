import React from 'react'
import type { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATHNAME } from '../router'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'
import { useDispatch } from 'react-redux'

const UserInfo: FC = () => {
	const nav = useNavigate()
	const dispatch = useDispatch()

	const { username, nickname } = useGetUserInfo()

	const logout = () => {
		dispatch(logoutReducer())
		removeToken()
		message.success('退出登录成功')
		nav(LOGIN_PATHNAME)
	}

	const UserInfo = (
		<>
			<span style={{ color: '#e8e8e8' }}>
				<UserOutlined />
				{nickname}
			</span>
			<Button type="link" onClick={logout}>
				退出
			</Button>
		</>
	)

	const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

	return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
