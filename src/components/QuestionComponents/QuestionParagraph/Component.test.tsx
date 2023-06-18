import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('props默认属性测试', () => {
	render(<Component />)
	const span = screen.getByText('一行段落')
	expect(span).toBeInTheDocument()
})

test('props传入测试', () => {
	render(<Component text={'ad\nb\nc'} isCenter={true} />)

	const span = screen.getByText('ad')
	expect(span).toBeInTheDocument()
	expect(span).toHaveTextContent('ad')
	// 测试文字换行
	expect(span).not.toHaveTextContent('adb')

	// 获取父元素
	const p = span.parentElement
	// 断言。父元素不为空
	expect(p).not.toBeNull()
	// isCenter测试
	const style = p!.style || {}
	expect(style.textAlign).toBe('center')
})
