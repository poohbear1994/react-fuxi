import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import {
	isLoginOrRegister,
	isNoNeedUserInfo,
	MANAGE_INDEX_PATHNAME,
	LOGIN_PATHNAME,
} from '../router/index'

/**
 * @description: 当路由，用户信息改变时，触发此钩子，引导系统前往合法页面
 * @param {boolean} waitingUserData 是否正在等待用户信息请求结果
 */
const useNavPage = (waitingUserData: boolean) => {
	const { pathname } = useLocation()
	const { username } = useGetUserInfo()
	const nav = useNavigate()

	useEffect(() => {
		// 如果还在等待登录，直接返回
		if (waitingUserData) return

		// 如果已经登录
		if (username) {
			// 要跳转到登录页或者注册页，直接跳转到我的问卷页面
			if (isLoginOrRegister(pathname)) {
				nav(MANAGE_INDEX_PATHNAME)
			}
			return
		}

		// 未登录
		// 如果不需要用户信息
		if (isNoNeedUserInfo(pathname)) {
			return
		} else {
			nav(LOGIN_PATHNAME)
		}
	}, [waitingUserData, username, pathname])
}

export default useNavPage
