import React, { useEffect, useRef, useState, useMemo } from 'react'
import type { FC } from 'react'
import { Typography, Spin, Empty } from 'antd'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'
import { getQuestionListService } from '../../services/question'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'

const { Title } = Typography

const List: FC = () => {
	useTitle('问卷-列表页')

	const [searchParams] = useSearchParams()
	const containerRef = useRef<HTMLDivElement>(null)

	// 是否已经开始加载 防抖有延迟时间
	const [started, setStarted] = useState(false)
	// list内部的数据，不在url中体现
	const [page, setPage] = useState(1)
	// 上划加载更多时，list是累加的数据
	const [list = [], setList] = useState([])
	const [total, setTotal] = useState(0)
	// 是否还有更多的数据
	const haveMoreData = total > list.length

	const { run: load, loading } = useRequest(
		async () => {
			const data = await getQuestionListService({
				page,
				pageSize: LIST_PAGE_SIZE,
				keyword: searchParams.get(LIST_SEARCH_PARAM_KEY) || '',
			})

			return data
		},
		{
			manual: true,
			onSuccess(result) {
				const { list: l = [], total = 0 } = result
				setList(list.concat(l))
				setTotal(total)
				setPage(page + 1)
			},
		}
	)

	const { run: tryLoadMore } = useDebounceFn(
		() => {
			const elem = containerRef.current
			if (elem == null) return
			const domRect = elem.getBoundingClientRect()
			// 获取加载更多div底部距离页面顶部的距离
			const { bottom } = domRect
			// 当加载更多div完全出现在视口内时，触发数据加载逻辑
			if (bottom <= document.body.clientHeight) {
				load()
				setStarted(true)
			}
		},
		{
			wait: 1000,
		}
	)

	// 初始化时、进行搜索时,触发加载
	useEffect(() => {
		tryLoadMore()
	}, [searchParams])

	// 页面滚动时，尝试触发加载
	useEffect(() => {
		if (haveMoreData) {
			// 页面初始化时，全局监听scroll事件
			window.addEventListener('scroll', tryLoadMore)
		}
		// 组件卸载时，移除全局监听事件
		return () => {
			window.removeEventListener('scroll', tryLoadMore)
		}
	}, [0, haveMoreData])

	const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

	// keyword变化时，重置状态
	useEffect(() => {
		setStarted(false)
		setPage(1)
		setTotal(0)
		setList([])
	}, [keyword])

	const LoadMoreContentElement = useMemo(() => {
		if (!started || loading) return <Spin />
		if (total === 0) return <Empty description="暂无数据" />
		if (!haveMoreData) return <span>没有更多了...</span>
		return <span>开始加载下一页</span>
	}, [started, loading, haveMoreData])

	return (
		<>
			<div className={styles.header}>
				<div className={styles.left}>
					<Title level={3}>我的问卷</Title>
				</div>
				<div className={styles.right}>
					<ListSearch />
				</div>
			</div>
			<div className={styles.content}>
				{list.length > 0 &&
					list.map((q: any) => {
						const { _id, title, isPublished, isStart, answerCount, createdAt } = q
						return (
							<QuestionCard
								_id={_id}
								key={_id}
								title={title}
								isPublished={isPublished}
								isStar={isStart}
								answerCount={answerCount}
								createdAt={createdAt}
							></QuestionCard>
						)
					})}
			</div>
			<div className={styles.footer}>
				<div ref={containerRef}>{LoadMoreContentElement}</div>
			</div>
		</>
	)
}

export default List
