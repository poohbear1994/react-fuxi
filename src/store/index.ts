import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import type { UserStateType } from './userReducer'
import componentsReducer from './componentsReducer'
import type { ComponentsStateType } from './componentsReducer'

export type StateType = {
	user: UserStateType
	components: ComponentsStateType
}

export default configureStore({
	reducer: {
		user: userReducer,
		// 编辑页面组件列表
		components: componentsReducer,
	},
})
