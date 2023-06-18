import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('props默认属性测试', () => {
	render(<Component />)
	const h = screen.getByText('一行标题')
	expect(h).toBeInTheDocument()
})

test('props传入测试', () => {
	render(<Component text="hello" level={2} isCenter={true} />)

	const h = screen.getByText('hello')
	expect(h).toBeInTheDocument()

	// 断言。能匹配到h2标签
	expect(h.matches('h2')).toBeTruthy()

	const style = h.style
	expect(style.textAlign).toBe('center')
})
