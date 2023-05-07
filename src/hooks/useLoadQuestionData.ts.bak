import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const useLoadQuestionData = () => {
	const { id = '' } = useParams()

	const load = async () => {
		const data = await getQuestionService(id)
		return data
	}
	const { loading, data, error } = useRequest(load)
	return { loading, data, error }
}

export default useLoadQuestionData
