import React, { FC } from 'react'

interface Props {
	name?: string
	isAdmin?: boolean
}

const Index: FC<Props> = ({ name, isAdmin }) => (
	<div>
		Index {name}: {isAdmin}
	</div>
)

export default Index
