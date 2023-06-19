import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('props默认属性测试', () => {
	render(<Component />)

	const p = screen.getByText('多选标题')
	expect(p).toBeInTheDocument()

	for (let i = 1; i <= 3; i++) {
		const checkbox = screen.getByDisplayValue(`item${i}`)
		expect(checkbox).toBeInTheDocument()
		const label = screen.getByText(`选项${i}`)
		expect(label).toBeInTheDocument()

		if (i === 3) {
			expect(checkbox.getAttribute('checked')).not.toBe(`item${3}`)
		} else {
			expect(checkbox.getAttribute('checked')).toBeNull()
		}
	}
})

test('props传入测试', () => {
	const list = [
		{ value: 'v1', text: 't1', checked: false },
		{ value: 'v2', text: 't2', checked: true },
		{ value: 'v3', text: 't3', checked: true },
	]

	render(<Component title="hello" list={list} />)

	const p = screen.getByText('hello')
	expect(p).toBeInTheDocument()

	for (let i = 1; i <= 3; i++) {
		const checkbox = screen.getByDisplayValue(`v${i}`)
		expect(checkbox).toBeInTheDocument()
		const label = screen.getByText(`t${i}`)
		expect(label).toBeInTheDocument()

		// 测试选中功能
		if (i === 1) {
			expect(checkbox.getAttribute('checked')).toBeNull()
		} else {
			expect(checkbox.getAttribute('checked')).not.toBeNull()
		}
	}
})
