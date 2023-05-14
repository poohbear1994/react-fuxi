/**
 * @description: 问卷 段落组件
 */

import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'

// 导出所有内容，方便再QuestionComponents的index中做所有组件的统一类型导出
export * from './interface'

export default {
	title: '段落',
	type: 'questionParagraph', // 要和后端统一好
	Component,
	defaultProps: QuestionParagraphDefaultProps,
	PropComponent,
}
