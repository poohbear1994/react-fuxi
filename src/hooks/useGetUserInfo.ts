import { useSelector } from 'react-redux'
import type { StateType } from '../store/index'
import type { UserStateType } from '../store/userReducer'

const useGetUserInfo = () => {
	const { username, nickname } = useSelector<StateType, UserStateType>(state => state.user)
	return { username, nickname }
}

export default useGetUserInfo
