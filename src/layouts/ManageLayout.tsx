import React, { FC } from 'react'
import styles from './ManageLayout.module.scss'
import { Outlet } from 'react-router-dom'

const ManageLayout: FC = () => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.left}>
					<p>ManageLayout left</p>
					<button>创建问卷</button>
					<br />
					<a href="#">我的问卷</a>
					<br />
					<a href="#">星标问卷</a>
					<br />
					<a href="#">回收站</a>
				</div>
				<div className={styles.right}>
					<Outlet></Outlet>
				</div>
			</div>
		</>
	)
}

export default ManageLayout
