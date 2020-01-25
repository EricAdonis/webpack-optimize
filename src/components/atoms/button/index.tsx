import React, { FC } from 'react'

import { mapClassName } from '@libs/components'

export type IModifier = 'primary' | 'secondary'
export interface IProps {
	modifier?: IModifier | IModifier[]
}
export const Button: FC<IProps> = ({ children, modifier }) => (
	<button className={mapClassName('a-button', modifier)}>{children}</button>
)
