/**
 * @description 问卷 输入框
 */

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
	title: '标题',
	type: 'questionTitle', // 要和后端统一好
	Component,
	defaultProps: QuestionTitleDefaultProps,
	PropComponent,
}
