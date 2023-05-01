import React, { useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { Input } from 'antd'

const { Search } = Input

const ListSearch: FC = () => {
	const [value, setValue] = useState('')

	const handleSearch = (value: string) => {
		console.info(value)
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
