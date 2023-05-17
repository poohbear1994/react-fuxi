/**
 * @description 问卷 checkbox 组件
 */

import Component from './Component'
import { QuestionCheckboxDefaultProps } from './interface'
import PropComponent from './PropComponent'

// 导出所有内容，方便再QuestionComponents的index中做所有组件的统一类型导出
export * from './interface'

export default {
	title: '多选',
	type: 'questionCheckbox', // 要和后端统一好
	Component,
	defaultProps: QuestionCheckboxDefaultProps,
	PropComponent,
}
