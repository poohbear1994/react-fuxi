import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import {
	removeSelectedComponent,
	copySelectedComponent,
	pasteCopiedComponent,
	selectPrevComponent,
	selectNextComponent,
} from '../store/componentsReducer/index'

/**
 * @description: 判断当前选中元素是否合法
 */
const isActiceElementValid = () => {
	const activeElem = document.activeElement

	// 光标没有focus到input，我们就可以删除组件
	if (activeElem === document.body) return true
	if (activeElem?.matches("div[role='button']")) return true

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

	// 选中上一个
	useKeyPress('uparrow', () => {
		if (!isActiceElementValid()) return
		dispatch(selectPrevComponent())
	})

	// 选中下一个
	useKeyPress('downarrow', () => {
		if (!isActiceElementValid()) return
		dispatch(selectNextComponent())
	})

	// 撤销
	useKeyPress(
		['ctrl.z', 'meta.z'],
		() => {
			dispatch(UndoActionCreators.undo())
		},
		{
			// 是否严格匹配
			exactMatch: true,
		}
	)

	useKeyPress(
		['ctrl.shift.z', 'meta.shift.z'],
		() => {
			dispatch(UndoActionCreators.redo())
		},
		{
			// 是否严格匹配
			exactMatch: true,
		}
	)
}

export default useBindCanvasKeyPress
