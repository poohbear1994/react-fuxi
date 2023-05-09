import React from 'react'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfigByType } from '../../../components/QuestionComponents'
import type { ComponentPropsType } from '../../../components/QuestionComponents'

const NoProp: FC = () => {
	return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const genComponent = (type: string, props: ComponentPropsType, id: string) => {
	const config = getComponentConfigByType(type)
	if (!config) return <NoProp />
	const { PropComponent } = config
	return <PropComponent {...props} key={id} />
}

const ComponentProp: FC = () => {
	const { selectedComponent } = useGetComponentInfo()

	if (!selectedComponent) return <NoProp />
	const { fe_id, type, props } = selectedComponent
	return (
		<div>
			{genComponent(type, props, fe_id)}
			<div>{JSON.stringify(props)}</div>
		</div>
	)

	return <div>ComponentProp</div>
}

export default ComponentProp
