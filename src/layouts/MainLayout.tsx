import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import styles from './MainLayout.module.scss'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
	const { waitingUserData } = useLoadUserData()
	useNavPage(waitingUserData)

	return (
		<Layout>
			<Header className={styles.header}>
				<div className={styles.left}>
					<Logo />
				</div>
				<div className={styles.right}>
					<UserInfo />
				</div>
			</Header>
			<Layout className={styles.main}>
				<Content>
					{waitingUserData ? (
						<div style={{ textAlign: 'center', marginTop: '60px' }}>
							<Spin />
						</div>
					) : (
						<Outlet />
					)}
				</Content>
			</Layout>
			<Footer className={styles.footer}>问卷调查 &copy;2023 - present. Created by 卢见信</Footer>
		</Layout>
	)
}

export default MainLayout
