import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider as MobxProvider } from 'mobx-react'

import { Routes } from '@utils/routes'
import { Store } from '@libs/mobx'

export const Provider: FC = () => {
	const store = new Store()
	return (
		<MobxProvider {...{ store }}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</MobxProvider>
	)
}
