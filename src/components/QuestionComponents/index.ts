import type { FC } from 'react'
import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConfig, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConfig, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConfig, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConfig, { QuestionRadioPropsType } from './QuestionRadio'

// 输出各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType &
	QuestionTitlePropsType &
	QuestionParagraphPropsType &
	QuestionInfoPropsType &
	QuestionTextareaPropsType &
	QuestionRadioPropsType

// 统一，组件的配置
export type ComponentConfigType = {
	title: string
	type: string
	Component: FC<ComponentPropsType>
	defaultProps: ComponentPropsType
	PropComponent: FC<ComponentPropsType>
}

// 全部组件配置的列表
const componentConfigList: Array<ComponentConfigType> = [
	QuestionInputConfig,
	QuestionTitleConfig,
	QuestionParagraphConfig,
	QuestionInfoConfig,
	QuestionTextareaConfig,
	QuestionRadioConfig,
]

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
		components: [QuestionInfoConfig, QuestionTitleConfig, QuestionParagraphConfig],
	},
	{
		groupId: 'inputGroup',
		groupName: '用户输入',
		components: [QuestionInputConfig, QuestionTextareaConfig],
	},
	{
		groupId: 'chooseGroup',
		groupName: '用户选择',
		components: [QuestionRadioConfig],
	},
]
