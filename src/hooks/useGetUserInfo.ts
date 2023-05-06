import { useSelector } from 'react-redux'
import type { StateType } from '../store/index'
import type { UserStateType } from '../store/userReducer'

/**
 * @description: 获取redux中保存的用户信息
 */
const useGetUserInfo = () => {
	const { username, nickname } = useSelector<StateType, UserStateType>(state => state.user)
	return { username, nickname }
}

export default useGetUserInfo
