import React from 'react'
// 引入路由供应组件
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
	return <RouterProvider router={router}></RouterProvider>
}

export default App
