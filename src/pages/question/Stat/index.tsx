import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
	const { loading } = useLoadQuestionData()

	return (
		<div>
			<div>Stat Page</div>
		</div>
	)
}

export default Stat
