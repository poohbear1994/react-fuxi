import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

//#region 引入页面
import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List'
import Trash from '../pages/manage/Trash'
import Star from '../pages/manage/Star'
// import Edit from '../pages/question/Edit'
// import Stat from '../pages/question/Stat'

// 路由懒加载，拆分bundle，优化首页体积
const Edit = lazy(() => import(/* webpackChunkName: "Edit" */ '../pages/question/Edit'))
const Stat = lazy(() => import(/* webpackChunkName: "Stat" */ '../pages/question/Stat'))
//#endregion

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout></MainLayout>,
		children: [
			{
				path: '/', //根路径
				element: <Home></Home>,
			},
			{
				path: 'login',
				element: <Login></Login>,
			},
			{
				path: 'register',
				element: <Register></Register>,
			},
			{
				path: 'manage',
				element: <ManageLayout></ManageLayout>,
				children: [
					{
						path: 'list',
						element: <List></List>,
					},
					{
						path: 'trash',
						element: <Trash></Trash>,
					},
					{
						path: 'star',
						element: <Star></Star>,
					},
				],
			},
			{
				path: '*', // * 表示兜底，其它同层路由都为命中时，命中该路由，404都写在最后
				element: <NotFound></NotFound>,
			},
		],
	},
	{
		path: 'question',
		element: <QuestionLayout></QuestionLayout>,
		children: [
			{
				path: 'edit/:id', // 动态路由
				element: <Edit></Edit>,
			},
			{
				path: 'stat/:id',
				element: <Stat></Stat>,
			},
		],
	},
])

export default router

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'

export const isLoginOrRegister = (pathname: string) => {
	if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
	return false
}

export const isNoNeedUserInfo = (pathname: string) => {
	if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true
	return false
}
