import React, { FC } from 'react'

export interface IProps {
	disable?: boolean
}

export const Button: FC<IProps> = ({ disable }) => (
	<button>{disable ? 'unActive' : 'Active'}</button>
)
