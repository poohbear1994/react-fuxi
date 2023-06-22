import type { Meta, StoryObj } from '@storybook/react'

// 引入需要测试的组件
import Component from '../../components/QuestionComponents/QuestionInfo/Component'

// 填写测试信息
const meta = {
	title: 'Question/QuestionInfo',
	component: Component,
	tags: ['autodocs'],
} satisfies Meta<typeof Component>

export default meta

// 生成storybook的ts类型
type Story = StoryObj<typeof meta>

// 输出测试用例
// 测试默认属性下的组件
export const DefaultComponent: Story = {
	// args用于填写组件的props，传入空对象代表使用组件的默认props
	args: {},
}

// 测试人为设置属性的组件
export const SetComponent: Story = {
	args: {
		title: '设置title测试',
		desc: '设置desc测试',
	},
}

// 测试desc换行
export const DescBreakLine: Story = {
	args: {
		title: '设置title测试',
		desc: 'a\nA\nb',
	},
}
