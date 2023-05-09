import React from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfigByType } from '../../../components/QuestionComponents'
import type { ComponentPropsType } from '../../../components/QuestionComponents'

const NoProp: FC = () => {
	return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
	const dispatch = useDispatch()
	const { selectedComponent } = useGetComponentInfo()
	if (!selectedComponent) return <NoProp />

	const { type, props } = selectedComponent
	const config = getComponentConfigByType(type)
	if (!config) return <NoProp />

	const changeProps = (newProps: ComponentPropsType) => {
		if (!selectedComponent) return
		const { fe_id } = selectedComponent
		dispatch(changeComponentProps({ newProps, fe_id }))
	}
	const { PropComponent } = config
	return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
