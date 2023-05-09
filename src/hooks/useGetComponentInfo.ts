import { useSelector } from 'react-redux'
import type { StateType } from '../store/index'
import type { ComponentsStateType } from '../store/componentsReducer/index'

const useGetComponentInfo = () => {
	const components = useSelector<StateType, ComponentsStateType>(state => state.components)
	const { componentList = [], selectedId = '' } = components
	const selectedComponent = componentList.find(c => c.fe_id === selectedId)

	return {
		selectedComponent,
		componentList,
		selectedId,
	}
}

export default useGetComponentInfo
