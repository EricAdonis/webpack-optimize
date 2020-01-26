import React, { FC } from 'react'

import { mapClassName } from '@libs/components'

export type IModifier = 'primary' | 'secondary'
export interface IProps {
	modifier?: IModifier | IModifier[]
	disable?: boolean
}
export const Button: FC<IProps> = ({ children, ...props }) => (
	<button
		className={mapClassName('a-button', props.modifier)}
		disabled={props.disable}
	>
		<span>{children}</span>
	</button>
)
