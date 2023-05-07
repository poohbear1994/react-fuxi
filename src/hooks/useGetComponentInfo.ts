import { useSelector } from 'react-redux'
import type { StateType } from '../store/index'
import type { ComponentsStateType } from '../store/componentsReducer/index'

const useGetComponentInfo = () => {
	const components = useSelector<StateType, ComponentsStateType>(state => state.components)
	const { componentList = [], selectedId = '' } = components

	return {
		componentList,
		selectedId,
	}
}

export default useGetComponentInfo
