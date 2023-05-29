import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'
import { getQuestionService } from '../services/question'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const useLoadQuestionData = () => {
	const dispatch = useDispatch()
	const { id = '' } = useParams()

	// 请求当前页面的问卷数据
	const { data, loading, error, run } = useRequest(
		async (id: string) => {
			if (!id) throw new Error('没有问卷 id')
			const data = await getQuestionService(id)
			return data
		},
		{
			manual: true,
		}
	)

	// 根据获取的data设置redux
	useEffect(() => {
		if (!data) return

		const {
			title = '',
			desc = '',
			css = '',
			js = '',
			isPublished = false,
			componentList = [],
		} = data

		let selectedId = ''
		if (componentList.length) selectedId = componentList[0].fe_id

		// 把当前问卷的componentList存入redux
		dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
		// 把当前问卷的pageInfo存入redux中
		dispatch(resetPageInfo({ title, desc, css, js, isPublished }))
		dispatch(UndoActionCreators.clearHistory())
	}, [data])

	// 当id改变的时候，执行ajax 加载问卷数据
	useEffect(() => {
		run(id)
	}, [id])

	return { loading, error }
}

export default useLoadQuestionData
