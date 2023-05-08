import React from 'react'
import type { FC, MouseEvent } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { componentConfigGroup } from '../../../components/QuestionComponents'
import type { ComponentConfigType } from '../../../components/QuestionComponents'
import styles from './ComponentLib.module.scss'
import { addComponent } from '../../../store/componentsReducer'
import type { ComponentInfoType } from '../../../store/componentsReducer'

const { Title } = Typography

const genComponent = (c: ComponentConfigType) => {
	const dispatch = useDispatch()
	const { Component, title, type, defaultProps } = c

	const handleClick = (event: MouseEvent) => {
		event.stopPropagation()
		const component: ComponentInfoType = {
			fe_id: nanoid(5),
			title,
			props: defaultProps,
			type,
		}
		dispatch(addComponent(component))
	}

	return (
		<div key={type} className={styles.wrapper} onClick={handleClick}>
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
