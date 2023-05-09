import React from 'react'
import type { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/componentsReducer'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

const Edit: FC = () => {
	const { loading, error } = useLoadQuestionData()
	const dispatch = useDispatch()

	const clearSelectedId = () => {
		dispatch(changeSelectedId(''))
	}

	return (
		<div className={styles.container}>
			{/* 编辑器顶部 */}
			<div style={{ backgroundColor: 'yellowgreen' }}>Header</div>
			{/* 编辑器主体 */}
			<div className={styles['content-wrapper']}>
				<div className={styles.content}>
					<div className={styles.left}>
						<LeftPanel />
					</div>
					<div className={styles.main} onClick={clearSelectedId}>
						<div className={styles['canvas-wrapper']}>
							<EditCanvas loading={loading} />
						</div>
					</div>
					<div className={styles.right}>
						<RightPanel />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Edit
