import axios from './ajax'
import type { ResDataType } from './ajax'

export const getQuestionService = async (id: string): Promise<ResDataType> => {
	const url = `/api/question/${id}`
	const data = (await axios.get(url)) as ResDataType
	return data
}
