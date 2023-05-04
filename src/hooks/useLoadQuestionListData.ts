import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import {
	LIST_SEARCH_PARAM_KEY,
	LIST_PAGE_PARAM_KEY,
	LIST_PAGE_SIZE_PARAM_KEY,
	LIST_PAGE_SIZE,
} from '../constant/index'

type OptionType = {
	isStar: boolean
	isDeleted: boolean
}

const useLoadQuestionData = (opt: Partial<OptionType> = {}) => {
	const { isStar, isDeleted } = opt

	// 获取当前url的查询参数
	const [searchParams] = useSearchParams()

	// 发起网络请求
	const { data, loading, error, refresh } = useRequest(
		async () => {
			const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
			const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
			const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE

			const data = await getQuestionListService({
				keyword,
				isStar,
				isDeleted,
				page,
				pageSize,
			})
			return data
		},
		{
			// 当searchParams改变时，重新发起请求
			refreshDeps: [searchParams],
		}
	)

	// 返回请求到的数据
	return {
		data,
		loading,
		error,
		refresh,
	}
}

export default useLoadQuestionData
