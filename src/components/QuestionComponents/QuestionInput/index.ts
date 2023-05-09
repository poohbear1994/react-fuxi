/**
 * @description 问卷 输入框
 */

import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'

// 导出所有内容，方便再QuestionComponents的index中做所有组件的统一类型导出
export * from './interface'

export default {
	title: '输入框',
	type: 'questionInput', // 要和后端统一好
	Component,
	defaultProps: QuestionInputDefaultProps,
	PropComponent,
}
