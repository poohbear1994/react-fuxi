import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
	removeSelectedComponent,
	copySelectedComponent,
	pasteCopiedComponent,
} from '../store/componentsReducer/index'

/**
 * @description: 判断当前选中元素是否合法
 */
const isActiceElementValid = () => {
	const activeElem = document.activeElement

	// 光标没有focus到input，我们就可以删除组件
	if (activeElem === document.body) return true

	return false
}

const useBindCanvasKeyPress = () => {
	const dispatch = useDispatch()

	// 删除组件
	useKeyPress(['backspace', 'delete'], () => {
		if (!isActiceElementValid()) return
		dispatch(removeSelectedComponent())
	})

	// 复制组件
	useKeyPress(['ctrl.c', 'meta.c'], () => {
		if (!isActiceElementValid()) return
		dispatch(copySelectedComponent())
	})

	// 粘贴组件
	useKeyPress(['ctrl.v', 'meta.v'], () => {
		if (!isActiceElementValid()) return
		dispatch(pasteCopiedComponent())
	})
}

export default useBindCanvasKeyPress
