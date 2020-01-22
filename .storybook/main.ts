import { basicConfig } from '../config/basic.config'

export default {
	stories: ['../src/components/**/*.stories.tsx'],
	addons: [
		'@storybook/addon-knobs/register',
		'@storybook/addon-actions/register',
		'@storybook/addon-viewport/register',
	],
	webpackFinal: config => {
		const {
			optimization,
			plugins,
			module,
			resolve: { extensions, alias },
		} = basicConfig({ isDev: true, isStories: true })
		delete alias['react-dom']
		return {
			...config,
			optimization,
			plugins: [
				...config.plugins,
				...plugins.filter((_, idx) => ![1, 2, 3].includes(idx)),
			],
			module,
			resolve: {
				...config.resolve,
				extensions,
				alias,
			},
		}
	},
}
