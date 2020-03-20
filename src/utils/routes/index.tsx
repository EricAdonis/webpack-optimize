import React, { FC, Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import nano from 'nanoid'

import { SettingRoutes } from '@configs/routes'

export const Routes: FC = () => {
	return (
		<Suspense fallback={null}>
			<Switch>
				{SettingRoutes.map(route => (
					<Route
						key={nano()}
						exact={route.exact}
						path={route.path}
						render={() => {
							const Component = lazy(() =>
								import(/* webpackPrefetch: true */ `@pages/${route.component}`)
							)
							return <Component />
						}}
					/>
				))}
			</Switch>
		</Suspense>
	)
}
