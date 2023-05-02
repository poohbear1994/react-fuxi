import React, { useEffect, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant/index'

const { Search } = Input

const ListSearch: FC = () => {
	const [value, setValue] = useState('')
	const { pathname } = useLocation()
	const nav = useNavigate()
	const [searchParams] = useSearchParams()

	useEffect(() => {
		// 每当searchParams有变化，都会执行该回调
		const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
		setValue(curVal)
	}, [searchParams])

	const handleSearch = (value: string) => {
		// 跳转页面，增加url参数
		nav({
			pathname,
			search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
		})
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	return (
		<Search
			placeholder="输入关键字"
			style={{ width: '200px' }}
			size="large"
			allowClear
			value={value}
			onChange={handleChange}
			onSearch={handleSearch}
		></Search>
	)
}

export default ListSearch
