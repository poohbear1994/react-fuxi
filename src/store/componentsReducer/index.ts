/**
 * @description: 存储问卷所用到的组件
 */
import produce from 'immer'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId } from './utils'

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
}

const INIT_STATE: ComponentsStateType = {
	selectedId: '',
	componentList: [],
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
} = componentsSlice.actions

export default componentsSlice.reducer
