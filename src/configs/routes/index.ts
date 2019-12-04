export interface ISettingRoutes {
	exact: boolean
	path: string
	component: string
}

export const SettingRoutes: ISettingRoutes[] = [
	{
		exact: true,
		path: '/',
		component: 'index',
	},
]
