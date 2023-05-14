import React from 'react'
import type { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoDefaultProps } from './interface'
import type { QuestionInfoPropsType } from './interface'

const { Title, Paragraph } = Typography

const Component: FC<QuestionInfoPropsType> = props => {
	const { title, desc = '' } = { ...QuestionInfoDefaultProps, ...props }

	const descTextList = desc.split('\n')

	return (
		<div style={{ textAlign: 'center' }}>
			<Title style={{ fontSize: '24px' }}>{title}</Title>
			<Paragraph>
				{descTextList.map((t, index) => (
					<span key={index}>
						{index > 0 && <br />}
						{t}
					</span>
				))}
			</Paragraph>
		</div>
	)
}

export default Component
