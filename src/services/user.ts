import axios from './ajax'
import type { ResDataType } from './ajax'

/**
 * @description: 获取用户信息
 */
export const getUserInfoService = async (): Promise<ResDataType> => {
	const url = '/api/user/info'
	const data = (await axios.get(url)) as ResDataType
	return data
}

/**
 * @description: 注册账号
 * @param {string} username
 * @param {string} password
 * @param {string} nickname
 */
export const registerService = async (
	username: string,
	password: string,
	nickname?: string
): Promise<ResDataType> => {
	const url = '/api/user/register'
	const body = { username, password, nickname: nickname || username }
	const data = (await axios.post(url, body)) as ResDataType
	return data
}

/**
 * @description: 用户登录
 * @param {string} username
 * @param {string} password
 */
export const loginService = async (username: string, password: string): Promise<ResDataType> => {
	const url = '/api/user/login'
	const body = { username, password }
	const data = (await axios.post(url, body)) as ResDataType
	return data
}
