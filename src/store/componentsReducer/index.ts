import { createSlice } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'

export type ComponentInfoType = {
	fe_id: string
	type: string
	title: string
	props: ComponentPropsType
}
