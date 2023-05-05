import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'

export type UserStateType = {
	username: string
	nickname: string
}

const INIT_STATE: UserStateType = {
	username: '',
	nickname: '',
}

const userSlice = createSlice<UserStateType, SliceCaseReducers<UserStateType>, 'user'>({
	name: 'user',
	initialState: INIT_STATE,
	reducers: {
		loginReducer(state: UserStateType, action: PayloadAction<UserStateType>) {
			return action.payload
		},
		logout() {
			return INIT_STATE
		},
	},
})

export const { loginReducer, logout } = userSlice.actions

export default userSlice.reducer
