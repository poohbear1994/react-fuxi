import React from 'react'
import type { FC } from 'react'
// import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './EditCanvas'

const Edit: FC = () => {
	// const { loading, data: questionData } = useLoadQuestionData()
	return (
		<div className={styles.container}>
			{/* 编辑器顶部 */}
			<div style={{ backgroundColor: 'yellowgreen' }}>Header</div>
			{/* 编辑器主体 */}
			<div className={styles['content-wrapper']}>
				<div className={styles.content}>
					<div className={styles.left}>Left</div>
					<div className={styles.main}>
						<div className={styles['canvas-wrapper']}>
							<EditCanvas />
						</div>
					</div>
					<div className={styles.right}>right</div>
				</div>
			</div>
		</div>
	)
}

export default Edit
