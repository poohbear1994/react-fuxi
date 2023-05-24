import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction } from 'redux-undo'
import type { StateWithHistory } from 'redux-undo'
import userReducer from './userReducer'
import type { UserStateType } from './userReducer'
import componentsReducer from './componentsReducer'
import type { ComponentsStateType } from './componentsReducer'
import pageInfoReducer from './pageInfoReducer'
import type { PageInfoType } from './pageInfoReducer'

export type StateType = {
	user: UserStateType
	components: StateWithHistory<ComponentsStateType>
	pageInfo: PageInfoType
}

export default configureStore({
	reducer: {
		user: userReducer,
		// 编辑页面组件列表
		components: undoable(componentsReducer, {
			limit: 20,
			filter: excludeAction([
				'components/resetComponent',
				'components/changeSelectedId',
				'components/selectNextComponent',
				'components/selectPrevComponent',
			]),
		}),
		// 页面信息
		pageInfo: pageInfoReducer,
	},
})
