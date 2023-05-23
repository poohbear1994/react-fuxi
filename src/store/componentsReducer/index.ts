/**
 * @description: 存储问卷所用到的组件
 */
import produce from 'immer'
import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { arrayMove } from '@dnd-kit/sortable'
import type { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'

export type ComponentInfoType = {
	fe_id: string
	type: string
	title: string
	isHidden?: boolean
	isLocked?: boolean
	props: ComponentPropsType
}

export type ComponentsStateType = {
	selectedId: string
	componentList: Array<ComponentInfoType>
	copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
	selectedId: '',
	componentList: [],
	copiedComponent: null,
}

export const componentsSlice = createSlice({
	name: 'components',
	initialState: INIT_STATE,
	reducers: {
		// 重置所有组件
		resetComponents(state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) {
			return action.payload
		},

		// 修改 selectedId
		changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
			draft.selectedId = action.payload
		}),

		// 添加组件到画布
		addComponent: produce(
			(draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
				const newComponent = action.payload
				insertNewComponent(draft, newComponent)
			}
		),

		// 修改组件属性
		changeComponentProps: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
			) => {
				const { newProps, fe_id } = action.payload
				const { componentList } = draft
				const curComp = componentList.find(c => c.fe_id === fe_id)
				if (curComp) {
					curComp.props = {
						...curComp.props,
						...newProps,
					}
				}
			}
		),

		// 删除选中的组件
		removeSelectedComponent: produce((draft: ComponentsStateType) => {
			const { selectedId: removeId, componentList } = draft
			const index = componentList.findIndex(c => c.fe_id === removeId)
			draft.selectedId = getNextSelectedId(removeId, componentList)
			draft.componentList.splice(index, 1)
		}),

		// 隐藏/显示 组件
		changeComponentHidden: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
				const { componentList = [] } = draft
				const { fe_id, isHidden } = action.payload
				let newSelectedId = ''
				if (isHidden) {
					// 要隐藏
					newSelectedId = getNextSelectedId(fe_id, componentList)
				} else {
					newSelectedId = fe_id
				}
				draft.selectedId = newSelectedId

				const curComp = componentList.find(c => c.fe_id === fe_id)
				if (curComp) curComp.isHidden = isHidden
			}
		),

		// 锁定/解锁 组件
		toggleComponentLock: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
				const { componentList = [] } = draft
				const { fe_id } = action.payload
				const curComp = componentList.find(c => c.fe_id === fe_id)
				if (curComp) curComp.isLocked = !curComp.isLocked
			}
		),

		// copy当前选中组件
		copySelectedComponent: produce((draft: ComponentsStateType) => {
			const { componentList = [], selectedId } = draft
			const selectedComponent = componentList.find(c => c.fe_id === selectedId)
			if (selectedComponent == null) return
			// 设拷贝选中组件
			draft.copiedComponent = cloneDeep(selectedComponent)
		}),

		// 粘贴复制的组件
		pasteCopiedComponent: produce((draft: ComponentsStateType) => {
			const { copiedComponent } = draft
			if (copiedComponent == null) return
			// 注意修改组件id
			copiedComponent.fe_id = nanoid(5)
			// 获取插入位置的index
			insertNewComponent(draft, copiedComponent)
		}),

		// 选中上一个
		selectPrevComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
			if (selectedIndex < 0) return // 未选中组件
			if (selectedIndex <= 0) return // 已经选中了第一个，无法再向上选中
			draft.selectedId = componentList[selectedIndex - 1].fe_id
		}),

		// 选中下一个
		selectNextComponent: produce((draft: ComponentsStateType) => {
			const { selectedId, componentList } = draft
			const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
			const length = componentList.length
			if (selectedIndex + 1 === length) return // 已经选中了最后一个，无法再向下选中
			draft.selectedId = componentList[selectedIndex + 1].fe_id
		}),

		// 修改组件标题
		changeComponentTitle: produce(
			(draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
				const { fe_id, title } = action.payload
				const { componentList } = draft
				const curComp = componentList.find(c => c.fe_id === fe_id)
				if (curComp) curComp.title = title
			}
		),

		// 移动组件位置
		moveComponent: produce(
			(
				draft: ComponentsStateType,
				action: PayloadAction<{ oldIndex: number; newIndex: number }>
			) => {
				const { componentList: curComponentList } = draft
				const { oldIndex, newIndex } = action.payload
				draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
			}
		),
	},
})
export const {
	resetComponents,
	changeSelectedId,
	addComponent,
	changeComponentProps,
	removeSelectedComponent,
	changeComponentHidden,
	toggleComponentLock,
	copySelectedComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent,
	changeComponentTitle,
	moveComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
