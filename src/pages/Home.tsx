import React, { FC, MouseEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Home: FC = () => {
	const nav = useNavigate()
	const clickHandler = (e: MouseEvent) => {
		console.log(e)
		// nav('/login?b=20')
		// -1 返回上一页面
		// nav(-1)
		nav({
			pathname: '/login',
			search: 'b=2',
		})
	}

	return (
		<div>
			<p>Home</p>
			<div>
				<button onClick={clickHandler}>登录</button>
				{/* 链接跳转 */}
				<Link to="register?a=10">注册</Link>
			</div>
		</div>
	)
}

export default Home
