import type { FC } from 'react'
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle'

// 输出各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 统一，组件的配置
export type ComponentConfigType = {
	title: string
	type: string
	Component: FC<ComponentPropsType>
	defaultProps: ComponentPropsType
}

// 全部组件配置的列表
const componentConfigList: Array<ComponentConfigType> = [QuestionInputConfig, QuestionTitleConfig]

/**
 * @description: 根据type获取对应的组件配置
 * @param {string} type
 */
export const getComponentConfigByType = (type: string) => {
	return componentConfigList.find(c => c.type === type)
}

// 组件分组配置
export const componentConfigGroup = [
	{
		groupId: 'textGroup',
		groupName: '文本显示',
		components: [QuestionTitleConfig],
	},
	{
		groupId: 'inputGroup',
		groupName: '用户输入',
		components: [QuestionInputConfig],
	},
]
