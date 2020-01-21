import React from 'react'

export interface IButton extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<IButton> = ({ children, ...props }) => (
	<button {...props}>{children}</button>
)
