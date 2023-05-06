import React from 'react'
import type { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitleDefaultProps } from './interface'
import type { QuestionTitlePropsType } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = props => {
	// 传入的props覆盖默认的props
	const { text = '', isCenter = true, level = 1 } = { ...QuestionTitleDefaultProps, ...props }

	/**
	 * @description: 根据level生成fontSize大小
	 * @param {number} level
	 */
	const genFontSizer = (level: number) => {
		switch (level) {
			case 1:
				return '24px'
			case 2:
				return '20px'
			case 3:
				return '16px'
			case 4:
				return '16px'
			case 5:
				return '16px'
			default:
				return '16px'
		}
	}

	return (
		<Title
			level={level}
			style={{
				textAlign: isCenter ? 'center' : 'start',
				marginBottom: '0',
				fontSize: genFontSizer(level),
			}}
		>
			{text}
		</Title>
	)
}

export default QuestionTitle
