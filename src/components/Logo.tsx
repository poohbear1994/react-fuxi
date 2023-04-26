import React, { FC } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import { HOME_PATHNAME } from '../router'

const { Title } = Typography

const Logo: FC = () => {
	return (
		<div className={styles.container}>
			<Link to={HOME_PATHNAME}>
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
