/**
 * @description: 存储/获取 user token
 */

const KEY = 'USER_TOKEN'

export const setToken = (token: string) => {
	localStorage.setItem(KEY, token)
}

export const getToken = () => {
	return localStorage.getItem(KEY) || ''
}

export const removeToken = () => {
	localStorage.removeItem(KEY)
}
