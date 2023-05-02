import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'

const useLoadQuestionData = () => {
	const { id = '' } = useParams()
	const [loading, setLoading] = useState(true)
	const [questionData, setQuestionData] = useState({})

	useEffect(() => {
		const fn = async () => {
			const data = await getQuestionService(id)
			setQuestionData(data)
			setLoading(false)
		}
		fn()
	}, [])
	return { loading, questionData }
}

export default useLoadQuestionData
