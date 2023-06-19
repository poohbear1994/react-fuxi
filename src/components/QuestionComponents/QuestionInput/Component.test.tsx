import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('props默认属性测试', () => {
	render(<Component />)

	const p = screen.getByText('输入框标题')
	expect(p).toBeInTheDocument()

	const input = screen.getByPlaceholderText('请输入...')
	expect(input).toBeInTheDocument()
})

test('props传入测试', () => {
	render(<Component title="hello" placeholder="world" />)

	const p = screen.getByText('hello')
	expect(p).toBeInTheDocument()

	const input = screen.getByPlaceholderText('world')
	expect(input).toBeInTheDocument()
})
