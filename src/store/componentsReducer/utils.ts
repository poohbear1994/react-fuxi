import { ComponentInfoType, ComponentsStateType } from './index'

/**
 * 获取接下来该选中的组件的ID
 **/
export const getNextSelectedId = (fe_id: string, componentList: Array<ComponentInfoType>) => {
	const visibleComponentList = componentList.filter(c => !c.isHidden)
	const index = visibleComponentList.findIndex(c => c.fe_id === fe_id)
	if (index < 0) return ''

	// 重新计算selectedID
	let newSelectedId = ''
	const length = visibleComponentList.length
	if (length <= 1) {
		// 组件长度就一个，被删除了，就没有组件了
		newSelectedId = ''
	} else {
		// 组件长度>1
		if (index + 1 === length) {
			newSelectedId = visibleComponentList[index - 1].fe_id
		} else {
			newSelectedId = visibleComponentList[index + 1].fe_id
		}
	}
	return newSelectedId
}

/**
 * @description: 插入一个组件到列表中
 * @param draft
 * @param newComponent 新组件
 */
export const insertNewComponent = (draft: ComponentsStateType, newComponent: ComponentInfoType) => {
	const { selectedId, componentList } = draft
	const index = componentList.findIndex(c => c.fe_id === selectedId)
	// 如果未选中任何组件
	if (!selectedId) {
		draft.componentList.push(newComponent)
	} else {
		draft.componentList.splice(index + 1, 0, newComponent)
	}
	draft.selectedId = newComponent.fe_id
}
