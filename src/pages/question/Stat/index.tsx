import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
	const { loading, data: questionData } = useLoadQuestionData()

	return (
		<div>
			<div>Stat Page</div>
			{loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p>}
		</div>
	)
}

export default Stat
