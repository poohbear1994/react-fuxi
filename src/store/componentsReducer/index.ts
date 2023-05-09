/**
 * @description: 存储问卷所用到的组件
 */
import produce from 'immer'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ComponentPropsType } from '../../components/QuestionComponents'

export type ComponentInfoType = {
	fe_id: string
	type: string
	title: string
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
	},
})
export const { resetComponents, changeSelectedId, addComponent, changeComponentProps } =
	componentsSlice.actions

export default componentsSlice.reducer
