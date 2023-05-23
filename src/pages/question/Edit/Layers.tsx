import React, { useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { Input, message, Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import {
	changeSelectedId,
	changeComponentTitle,
	toggleComponentLock,
	changeComponentHidden,
	moveComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './Layers.module.scss'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'

const Layers: FC = () => {
	const dispatch = useDispatch()
	const { selectedId, componentList } = useGetComponentInfo()

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

	/**
	 * @description: 修改图层标题
	 * @param {ChangeEvent} event
	 */
	const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		const newTitle = event.target.value.trim()
		if (!newTitle || !selectedId) return
		dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
	}

	/**
	 * @description: 切换 显示/隐藏
	 * @param {string} fe_id
	 * @param {boolean} isHidden
	 */
	const changeHidden = (fe_id: string, isHidden: boolean) => {
		dispatch(changeComponentHidden({ fe_id, isHidden }))
	}

	/**
	 * @description: 切换 锁定/解锁
	 * @param {string} fe_id
	 */
	const changeLocked = (fe_id: string) => {
		dispatch(toggleComponentLock({ fe_id }))
	}

	const componentListWithId = componentList.map(c => {
		return {
			...c,
			id: c.fe_id,
		}
	})

	const handleDragEnd = (oldIndex: number, newIndex: number) => {
		dispatch(moveComponent({ oldIndex, newIndex }))
	}

	return (
		<SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
			{componentList.map(c => {
				const { fe_id, isHidden, isLocked, title } = c

				const titleDefaultClassName = styles.title
				const selectedClassName = styles.selected
				const titleClassName = classNames({
					[titleDefaultClassName]: true,
					[selectedClassName]: fe_id === selectedId,
				})

				return (
					<SortableItem key={fe_id} id={fe_id}>
						<div className={styles.wrapper}>
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
							<div className={styles.handler}>
								<Space>
									<Button
										size="small"
										className={!isHidden ? styles.btn : ''}
										shape="circle"
										icon={<EyeInvisibleOutlined />}
										type={isHidden ? 'primary' : 'text'}
										onClick={() => changeHidden(fe_id, !isHidden)}
									/>
									<Button
										size="small"
										className={!isLocked ? styles.btn : ''}
										shape="circle"
										icon={<LockOutlined />}
										type={isLocked ? 'primary' : 'text'}
										onClick={() => changeLocked(fe_id)}
									/>
								</Space>
							</div>
						</div>
					</SortableItem>
				)
			})}
		</SortableContainer>
	)
}

export default Layers
