import React from 'react'
import type { FC } from 'react'
import { Typography } from 'antd'
import { componentConfigGroup } from '../../../components/QuestionComponents'
import type { ComponentConfigType } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'

const { Title } = Typography

const genComponent = (c: ComponentConfigType) => {
	const { Component, title, type, defaultProps } = c
	return (
		<div className={styles.wrapper}>
			<div className={styles.component}>
				<Component key={type} {...defaultProps} />
			</div>
		</div>
	)
}

const ComponentLib: FC = () => {
	return (
		<>
			{componentConfigGroup.map((group, index) => {
				const { groupName, components, groupId } = group
				return (
					<div key={groupId}>
						<Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
							{groupName}
						</Title>

						{components.map((c: ComponentConfigType) => genComponent(c))}
					</div>
				)
			})}
		</>
	)
}

export default ComponentLib
