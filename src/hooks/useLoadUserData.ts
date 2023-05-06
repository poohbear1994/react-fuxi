import { useState, useEffect } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { loginReducer } from '../store/userReducer'
import { getUserInfoService } from '../services/user'

/**
 * @description: 当username发生改变时，触发次钩子，发起请求获取用户信息
 */
const useLoadUserData = () => {
	const [waitingUserData, setWaitngUserData] = useState(true)
	const dispatch = useDispatch()

	// 加载userinfo
	const { run } = useRequest(
		async () => {
			const data = await getUserInfoService()
			return data
		},
		{
			manual: true,
			onSuccess(result) {
				const { username, nickname } = result
				dispatch(loginReducer({ username, nickname }))
			},
			onFinally() {
				setWaitngUserData(false)
			},
		}
	)

	// 判断当前 redux store 是否已经存在用户信息
	const { username } = useGetUserInfo()
	useEffect(() => {
		if (username) {
			setWaitngUserData(false)
			return
		}
		run()
	}, [username])

	return { waitingUserData }
}

export default useLoadUserData
