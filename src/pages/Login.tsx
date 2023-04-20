import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: FC = () => {
	const nav = useNavigate()
	const handleClick = () => {
		nav(-1)
	}
	return (
		<div>
			<p>Login</p>
			<div>
				<button onClick={handleClick}>返回</button>
			</div>
		</div>
	)
}

export default Login
