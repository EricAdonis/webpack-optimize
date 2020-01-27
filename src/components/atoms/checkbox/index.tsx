import React, { FC } from 'react'

// import { mapClassName } from '@libs/components'

export interface IProps {}
export const Checkbox: FC<IProps> = () => (
	<label>
		<input type='checkbox' />
	</label>
)
