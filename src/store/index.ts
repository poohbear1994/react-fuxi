import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import type { UserStateType } from './userReducer'
import componentsReducer from './componentsReducer'
import type { ComponentsStateType } from './componentsReducer'
import pageInfoReducer from './pageInfoReducer'
import type { PageInfoType } from './pageInfoReducer'

export type StateType = {
	user: UserStateType
	components: ComponentsStateType
	pageInfo: PageInfoType
}

export default configureStore({
	reducer: {
		user: userReducer,
		// 编辑页面组件列表
		components: componentsReducer,
		// 页面信息
		pageInfo: pageInfoReducer,
	},
})
