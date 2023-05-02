import React, { useEffect } from 'react'
import type { FC } from 'react'
import { getQuestionService } from '../../../services/question'

import { useParams } from 'react-router-dom'

const Edit: FC = () => {
	const { id = '' } = useParams()

	useEffect(() => {
		const fn = async () => {
			const data = await getQuestionService(id)
			console.table(data)
		}
		fn()
	}, [])

	return <p>Edit {id}</p>
}

export default Edit
