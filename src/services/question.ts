import axios from './ajax'
import type { ResDataType } from './ajax'

/**
 * @description: 获取单个问卷信息
 * @param {string} id 问卷id
 */
export const getQuestionService = async (id: string): Promise<ResDataType> => {
	const url = `/api/question/${id}`
	const data = (await axios.get(url)) as ResDataType
	return data
}

/**
 * @description: 创建问卷
 */
export const createQuestionService = async (): Promise<ResDataType> => {
	const url = '/api/question'
	const data = (await axios.post(url)) as ResDataType
	return data
}

type SearchOption = {
	keyword: string
	isStar: boolean
	isDeleted: boolean
	pageSize: number
	page: number
}

/**
 * @description: 查询问卷列表
 */
export const getQuestionListService = async (
	opt: Partial<SearchOption> = {}
): Promise<ResDataType> => {
	const url = '/api/question'
	const data = (await axios.get(url, { params: opt })) as ResDataType
	return data
}

/**
 * @description: 更新问卷
 */
export const updateQuestionService = async (
	id: string,
	opt: { [key: string]: any }
): Promise<ResDataType> => {
	const url = `/api/question/${id}`
	const data = (await axios.patch(url, opt)) as ResDataType
	return data
}

/**
 * @description: 复制问卷
 * @param {string} id
 */
export const duplicateQuestionService = async (id: string): Promise<ResDataType> => {
	const url = `/api/question/duplicate/${id}`
	const data = (await axios.post(url)) as ResDataType
	return data
}
