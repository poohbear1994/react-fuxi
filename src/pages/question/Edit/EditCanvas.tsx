import React from 'react'
import type { FC } from 'react'
import { Spin } from 'antd'
import styles from './EditCanvas.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfigByType } from '../../../components/QuestionComponents/index'
import type { ComponentInfoType } from '../../../store/componentsReducer'

type PropsType = {
	loading: boolean
}

/**
 * @description: 组件生成器
 * @param {ComponentInfoType} componentInfo 后端返回的组件信息，组件数据
 * @return {JSX.Element | null} 组件
 */
const genComponent = (componentInfo: ComponentInfoType) => {
	const { type, props } = componentInfo

	const componentConfig = getComponentConfigByType(type)
	if (componentConfig == null) return null

	const { Component } = componentConfig
	return <Component {...props} />
}

const EditCanvas: FC<PropsType> = props => {
	const { loading } = props
	const { componentList } = useGetComponentInfo()

	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: '24px' }}>
				<Spin />
			</div>
		)
	}

	return (
		<>
			<div className={styles.canvas}>
				{componentList.map(c => {
					const { fe_id } = c

					return (
						<div className={styles['component-wrapper']} key={fe_id}>
							<div className={styles.component}>{genComponent(c)}</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default EditCanvas
