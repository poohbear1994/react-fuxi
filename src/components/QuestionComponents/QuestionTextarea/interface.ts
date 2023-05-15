export type QuestionTextareaPropsType = {
	title?: string
	placeholder?: string
	onChange?: (newProps: QuestionTextareaPropsType) => void
	disabled?: boolean
}

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
	title: '文本框标题',
	placeholder: '请输入...',
}
