import React, { useState } from 'react'
import type { FC } from 'react'
import { Radio, Space, Typography } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { QuestionRadioDefaultProps } from './interface'
import type { QuestionRadioPropsType } from './interface'

const { Paragraph } = Typography

const Component: FC<QuestionRadioPropsType> = props => {
	const {
		title,
		options = [],
		isVertical,
		value: defaultVal = '',
	} = { ...QuestionRadioDefaultProps, ...props }

	const [value, setValue] = useState(defaultVal)

	const handleChange = (event: RadioChangeEvent) => {
		setValue(event.target.value)
	}

	return (
		<div>
			<Paragraph>{title}</Paragraph>
			<Radio.Group value={value} onChange={handleChange}>
				<Space direction={isVertical ? 'vertical' : 'horizontal'}>
					{options?.map(opt => {
						const { value, text } = opt
						return (
							<Radio value={value} key={value}>
								{text}
							</Radio>
						)
					})}
				</Space>
			</Radio.Group>
		</div>
	)
}

export default Component
