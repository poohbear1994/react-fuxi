import React, { FC, useEffect } from 'react'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '../router/index'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'

// import axios from 'axios'
// import '../__mock__/index'

const { Title, Paragraph } = Typography

const Home: FC = () => {
	useEffect(() => {
		// axios.get('/api/test').then(res => console.log(res))
		fetch('/api/test')
			.then(res => res.json())
			.then(data => console.table(data))
	}, [])

	const nav = useNavigate()

	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<Title>问卷调查 | 在线投票</Title>
				<Paragraph>已累计创建问卷 100 份，发布问卷 90 份， 收到答卷 980 份</Paragraph>
				<div>
					<Button type="primary" size="large" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
						开始使用
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Home
