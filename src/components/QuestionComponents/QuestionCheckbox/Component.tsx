import React from 'react'
import type { FC } from 'react'
import { Space, Typography, Checkbox } from 'antd'
import { QuestionCheckboxDefaultProps } from './interface'
import type { QuestionCheckboxPropsType } from './interface'

const { Paragraph } = Typography

const Component: FC<QuestionCheckboxPropsType> = props => {
	const { title, list = [], isVertical } = { ...QuestionCheckboxDefaultProps, ...props }
	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<Space direction={isVertical ? 'vertical' : 'horizontal'}>
				{list.map(opt => {
					const { value, text, checked } = opt
					return (
						<Checkbox value={value} key={value} checked={checked}>
							{text}
						</Checkbox>
					)
				})}
			</Space>
		</div>
	)
}

export default Component
