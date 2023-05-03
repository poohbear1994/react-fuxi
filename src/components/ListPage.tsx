import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Pagination } from 'antd'
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'

type PropsType = {
	total: number
}

const ListPage: FC<PropsType> = props => {
	const { total } = props
	const [searchParams, setSearchParams] = useSearchParams()
	const [current, setCurrent] = useState(1)
	const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

	// 当searchParams发生改变的时候获取page，pageSize，更新state
	useEffect(() => {
		const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
		setCurrent(page)
		const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
		setPageSize(pageSize)
	}, [searchParams])

	/**
	 * @description: 页，页数据量变化时，修改searchParams
	 * @param {number} page 页
	 * @param {number} pageSize 每页数据量
	 */
	const handlePageChange = (page: number, pageSize: number) => {
		setSearchParams([
			[LIST_PAGE_PARAM_KEY, `${page}`],
			[LIST_PAGE_SIZE_PARAM_KEY, `${pageSize}`],
		])
	}

	return (
		<Pagination total={total} current={current} pageSize={pageSize} onChange={handlePageChange} />
	)
}

export default ListPage
