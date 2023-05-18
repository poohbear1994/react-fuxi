import React, { useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { Input, message } from 'antd'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { changeSelectedId, changeComponentTitle } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'

const Layers: FC = () => {
	const dispatch = useDispatch()
	const { selectedId, selectedComponent, componentList } = useGetComponentInfo()

	const [changingTitleId, setChangingTitleId] = useState('')

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
			setChangingTitleId('')
		} else {
			setChangingTitleId(selectedId)
		}
	}

	const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		const newTitle = event.target.value.trim()
		if (!newTitle || !selectedId) return
		dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
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
							{fe_id === changingTitleId && (
								<Input
									value={title}
									onChange={changeTitle}
									onPressEnter={() => {
										setChangingTitleId('')
									}}
									onBlur={() => {
										setChangingTitleId('')
									}}
								/>
							)}
							{fe_id !== changingTitleId && title}
						</div>
						<div className={styles.handler}>button</div>
					</div>
				)
			})}
		</>
	)
}

export default Layers
