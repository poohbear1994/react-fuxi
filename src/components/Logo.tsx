import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import useGetUserInfo from '../hooks/useGetUserInfo'

const { Title } = Typography

const Logo: FC = () => {
	const { username } = useGetUserInfo()
	const [pathname, setPathname] = useState(HOME_PATHNAME)
	useEffect(() => {
		if (username) {
			setPathname(MANAGE_INDEX_PATHNAME)
		}
	}, [username])
	return (
		<div className={styles.container}>
			<Link to={pathname}>
				<Space>
					<Title level={1} className={styles['h1']}>
						<FormOutlined />
					</Title>
					<Title>问卷调查</Title>
				</Space>
			</Link>
		</div>
	)
}

export default Logo
