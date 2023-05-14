import React from 'react'
import type { FC, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { Spin } from 'antd'
import styles from './EditCanvas.module.scss'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import { getComponentConfigByType } from '../../../components/QuestionComponents/index'
import { changeSelectedId } from '../../../store/componentsReducer'
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
	const dispatch = useDispatch()
	const { loading } = props
	const { componentList, selectedId } = useGetComponentInfo()

	const handleClick = (event: MouseEvent, id: string) => {
		event.stopPropagation()
		dispatch(changeSelectedId(id))
	}

	// 绑定快捷键
	useBindCanvasKeyPress()

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
				{componentList
					.filter(c => !c.isHidden)
					.map(c => {
						const { fe_id, isLocked } = c

						// 拼接 class name
						const wrapperDefaultClassName = styles['component-wrapper']
						const selectedClassName = styles.selected
						const lockedClassName = styles.locked
						const wrapperClassName = classNames({
							[wrapperDefaultClassName]: true,
							[selectedClassName]: fe_id === selectedId,
							[lockedClassName]: isLocked,
						})

						return (
							<div className={wrapperClassName} key={fe_id} onClick={e => handleClick(e, fe_id)}>
								<div className={styles.component}>{genComponent(c)}</div>
							</div>
						)
					})}
			</div>
		</>
	)
}

export default EditCanvas
