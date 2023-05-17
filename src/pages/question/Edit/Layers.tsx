import React from 'react'
import type { FC } from 'react'
import { message } from 'antd'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'

const Layers: FC = () => {
	const dispatch = useDispatch()
	const { selectedId, selectedComponent, componentList } = useGetComponentInfo()

	/**
	 * @description: 点击标题选中组件
	 * @param {string} fe_id
	 */
	const handleTitleClick = (fe_id: string) => {
		const curComp = componentList.find(c => c.fe_id === fe_id)
		if (curComp && curComp.isHidden) {
			message.info('不能选中隐藏的组件')
			return
		}
		if (fe_id !== selectedId) {
			dispatch(changeSelectedId(fe_id))
		}
	}

	return (
		<>
			{componentList.map(c => {
				const { fe_id, isHidden, isLocked, title, props } = c

				const titleDefaultClassName = styles.title
				const selectedClassName = styles.selected
				const titleClassName = classNames({
					[titleDefaultClassName]: true,
					[selectedClassName]: fe_id === selectedId,
				})

				return (
					<div key={fe_id} className={styles.wrapper}>
						<div
							className={titleClassName}
							onClick={() => {
								handleTitleClick(fe_id)
							}}
						>
							{title}
						</div>
						<div className={styles.handler}>button</div>
					</div>
				)
			})}
		</>
	)
}

export default Layers
