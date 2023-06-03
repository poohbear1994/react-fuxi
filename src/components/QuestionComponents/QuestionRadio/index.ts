/**
 * @description 问卷 radio 组件
 */

import Component from './Component'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'
import StatComponent from './StatComponent'

// 导出所有内容，方便再QuestionComponents的index中做所有组件的统一类型导出
export * from './interface'

export default {
	title: '单选',
	type: 'questionRadio', // 要和后端统一好
	Component,
	defaultProps: QuestionRadioDefaultProps,
	PropComponent,
	StatComponent,
	// 扩展统计组件
}
