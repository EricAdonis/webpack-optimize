import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Routes } from '@utils/routes'

export const Provider: FC = () => {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	)
}
