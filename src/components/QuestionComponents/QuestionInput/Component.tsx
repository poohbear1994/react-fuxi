import React from 'react'
import type { FC } from 'react'
import { Typography, Input } from 'antd'
import { QuestionTitleDefaultProps } from './interface'
import type { QuestionInputPropsType } from './interface'

const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = props => {
	const { title, placeholder } = { ...QuestionTitleDefaultProps, ...props }

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<Input placeholder={placeholder}></Input>
			</div>
		</div>
	)
}

export default QuestionInput
