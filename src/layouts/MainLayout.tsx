import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './MainLayout.module.scss'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
	return (
		<Layout>
			<Header className={styles.header}>
				<div className={styles.left}>Logo</div>
				<div className={styles.right}>登录</div>
			</Header>
			<Layout className={styles.main}>
				<Content>
					<Outlet></Outlet>
				</Content>
			</Layout>
			<Footer className={styles.footer}>问卷调查 &copy;2023 - present. Created by 卢见信</Footer>
		</Layout>
	)
}

export default MainLayout
