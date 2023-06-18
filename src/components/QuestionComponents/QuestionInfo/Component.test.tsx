import React from 'react'
// 使用render在测试时对react组件完成渲染
import { render, screen } from '@testing-library/react'
import Component from './Component'

/**
 * 1. 渲染出react组件，才能进行测试，使用render
 * 2. 书写断言，进行测试
 */

test('props默认属性测试', () => {
	// 渲染组件
	render(<Component />)
	// screen.getByText会尝试从屏幕上获取传入的文本内容，创建一个对应的文本节点
	const h = screen.getByText('问卷标题')
	// 断言。期待document中有一个和h一样的document节点
	expect(h).toBeInTheDocument()
})

test('props传入属性测试', () => {
	render(<Component title="hello" desc="world" />)

	// 测试title
	const h = screen.getByText('hello')
	expect(h).toBeInTheDocument()

	// 测试desc
	const p = screen.getByText('world')
	expect(p).toBeInTheDocument()
})

test('多行文字时候，自动换行', () => {
	render(<Component desc={'ad\nb\nc'} />)

	const span = screen.getByText('ad')
	expect(span).toBeInTheDocument()
	// 断言文本内容中含有某字符或者某些字符
	expect(span).toHaveTextContent('a')
	expect(span).toHaveTextContent('d')
	expect(span).not.toHaveTextContent('adc')
})
