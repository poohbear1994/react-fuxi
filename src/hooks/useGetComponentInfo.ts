import { useSelector } from 'react-redux'
import type { StateType } from '../store/index'
import type { ComponentsStateType } from '../store/componentsReducer/index'

const useGetComponentInfo = () => {
	const components = useSelector<StateType, ComponentsStateType>(state => state.components)
	const { componentList = [] } = components

	return {
		componentList,
	}
}

export default useGetComponentInfo
