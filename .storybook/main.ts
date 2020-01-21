import { basicConfig } from '../config/basic.config'
import { babelLoader, threadLoader } from '../config/loader.config'

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
			resolve: { extensions, alias },
		} = basicConfig({ isDev: true })
		delete alias['react-dom']
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				threadLoader(),
				babelLoader({ isDev: true }),
				'react-docgen-typescript-loader',
			],
		})
		return {
			...config,
			optimization,
			plugins: [
				...config.plugins,
				...plugins.filter((_, idx) => ![1, 2, 3].includes(idx)),
			],
			resolve: {
				...config.resolve,
				extensions,
				alias,
			},
		}
	},
}
