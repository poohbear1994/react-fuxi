import axios from './ajax'
import type { ResDataType } from './ajax'

/**
 * @description: 获取问卷的统计列表
 */
export const getQuestionStatListService = async (
	questionId: string,
	opt: { page: number; pageSize: number }
): Promise<ResDataType> => {
	const url = `/api/stat/${questionId}`
	const data = (await axios.get(url, { params: opt })) as ResDataType
	return data
}
