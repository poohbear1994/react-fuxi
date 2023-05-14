/**
 * @description 问卷 info 组件
 */

import Component from './Component'
import { QuestionInfoDefaultProps } from './interface'
import PropComponent from './PropComponent'

// 导出所有内容，方便再QuestionComponents的index中做所有组件的统一类型导出
export * from './interface'

export default {
	title: '问卷信息',
	type: 'questionInfo', // 要和后端统一好
	Component,
	defaultProps: QuestionInfoDefaultProps,
	PropComponent,
}
