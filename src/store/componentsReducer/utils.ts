import { ComponentInfoType } from './index'

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
