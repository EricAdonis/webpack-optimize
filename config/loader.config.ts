import { RuleSetLoader } from 'webpack'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import globImporter from 'node-sass-glob-importer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const threadLoader = (): RuleSetLoader => ({
	loader: 'thread-loader',
	options: {
		workers: require('os').cpus().length,
		workerParallelJobs: 2,
	},
})

export const postCssLoader = (): RuleSetLoader => ({
	loader: 'postcss-loader',
	options: {
		ident: 'postcss',
		plugins: [autoprefixer(), cssnano()],
	},
})

export const cssLoader = (): RuleSetLoader => ({
	loader: 'css-loader',
})

export const scssLoader = (): RuleSetLoader => ({
	loader: 'sass-loader',
	options: {
		sassOptions: {
			importer: globImporter(),
		},
	},
})

export const babelLoader = ({ isDev }): RuleSetLoader => ({
	loader: 'babel-loader',
	options: {
		cacheDirectory: true,
		presets: [
			'@babel/preset-env',
			'@babel/preset-react',
			[
				'@babel/preset-typescript',
				{
					isTSX: true,
					allExtensions: true,
				},
			],
		],
		plugins: [
			'react-hot-loader/babel',
			[
				'@babel/plugin-transform-runtime',
				{
					corejs: 3,
				},
			],
			'object-to-json-parse',
			...(isDev ? [] : ['transform-remove-console']),
		],
	},
})

export const fileLoader = (): RuleSetLoader => ({
	loader: 'file-loader',
})

export const imageLoader = () => ({
	...fileLoader(),
	options: {
		outputPath: 'static/assets/images',
		name: '[name].[hash].[ext]',
	},
})

export const imageOptimizeLoader = (): RuleSetLoader => ({
	loader: 'image-webpack-loader',
})

export const fontLoader = (): RuleSetLoader => ({
	...fileLoader(),
	options: {
		outputPath: 'static/assets/fonts',
		name: '[name].[hash].[ext]',
	},
})

export const htmlLoader = (): RuleSetLoader => ({
	loader: 'html-loader',
	options: {
		minimize: true,
	},
})

export const extractCssPlugin = ({ isDev }): RuleSetLoader => ({
	loader: MiniCssExtractPlugin.loader,
	options: {
		hmr: isDev,
		reloadAll: isDev,
	},
})
