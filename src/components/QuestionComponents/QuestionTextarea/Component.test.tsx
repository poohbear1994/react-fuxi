import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('props默认属性测试', () => {
	render(<Component />)

	const p = screen.getByText('文本框标题')
	expect(p).toBeInTheDocument()

	const textarea = screen.getByPlaceholderText('请输入...')
	expect(textarea).toBeInTheDocument()
})

test('props传入测试', () => {
	render(<Component title="hello" placeholder="world" />)

	const p = screen.getByText('hello')
	expect(p).toBeInTheDocument()

	const textarea = screen.getByPlaceholderText('world')
	expect(textarea).toBeInTheDocument()
})
