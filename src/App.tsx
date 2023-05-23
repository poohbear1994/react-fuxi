import React from 'react'
import 'antd/dist/reset.css'
// 引入路由供应组件
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './App.css'

function App() {
	return <RouterProvider router={router}></RouterProvider>
}

export default App
