import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import type { UserStateType } from './userReducer'

export type StoreType = {
	user: UserStateType
}

export default configureStore({
	reducer: {
		user: userReducer,
	},
})
