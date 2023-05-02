import React from 'react'
import type { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
	const { loading, questionData } = useLoadQuestionData()
	return (
		<div>
			<div>Edit Page</div>
			{loading ? <p>loading</p> : <p>{JSON.stringify(questionData)}</p>}
		</div>
	)
}

export default Edit
