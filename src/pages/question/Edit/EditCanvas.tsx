import React from 'react'
import type { FC } from 'react'
import { Spin } from 'antd'
import styles from './EditCanvas.module.scss'
// import * from '../../../components/QuestionComponents/index'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component'

type PropsType = {
	loading: boolean
}

const EditCanvas: FC<PropsType> = props => {
	const { loading } = props

	if (loading) {
		return (
			<div style={{ textAlign: 'center', marginTop: '24px' }}>
				<Spin />
			</div>
		)
	}

	return (
		<>
			{!loading && (
				<div className={styles.canvas}>
					<div className={styles['component-wrapper']}>
						<div className={styles.component}>
							<QuestionTitle />
						</div>
					</div>
					<div className={styles['component-wrapper']}>
						<div className={styles.component}>
							<QuestionInput />
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default EditCanvas
