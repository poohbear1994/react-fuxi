import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

const useLoadQuestionData = () => {
	// 获取当前url的查询参数
	const [searchParams] = useSearchParams()

	// 发起网络请求
	const { data, loading, error } = useRequest(
		async () => {
			const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
			const data = await getQuestionListService({
				keyword,
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
	}
}

export default useLoadQuestionData
