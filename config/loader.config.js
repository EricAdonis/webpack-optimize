/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const globImporter = require('node-sass-glob-importer')

const threadLoader = () => ({
	loader: 'thread-loader',
	options: {
		workers: require('os').cpus().length,
		workerParallelJobs: 2,
	},
})

const postCssLoader = () => ({
	loader: 'postcss-loader',
	options: {
		ident: 'postcss',
		plugins: [autoprefixer(), cssnano()],
	},
})

const cssLoader = () => ({
	loader: 'css-loader',
})

const scssLoader = () => ({
	loader: 'sass-loader',
	options: {
		sassOptions: {
			importer: globImporter(),
		},
	},
})

const babelLoader = ({ isDev }) => ({
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
			['@babel/plugin-proposal-decorators', { legacy: true }],
			['@babel/plugin-proposal-class-properties', { loose: true }],
			[
				'@babel/plugin-transform-runtime',
				{
					corejs: 3,
				},
			],
			'object-to-json-parse',
			'@babel/plugin-proposal-optional-chaining',
			...(isDev ? [] : ['transform-remove-console']),
		],
	},
})

const fileLoader = () => ({
	loader: 'file-loader',
})

const imageLoader = () => ({
	...fileLoader(),
	options: {
		outputPath: 'static/assets/images',
		name: '[name].[hash].[ext]',
	},
})

const imageOptimizeLoader = () => ({
	loader: 'image-webpack-loader',
})

const fontLoader = () => ({
	...fileLoader(),
	options: {
		outputPath: 'static/assets/fonts',
		name: '[name].[hash].[ext]',
	},
})

const htmlLoader = () => ({
	loader: 'html-loader',
	options: {
		minimize: true,
	},
})

const extractCssPlugin = ({ isDev }) => ({
	loader: MiniCssExtractPlugin.loader,
	options: {
		hmr: isDev,
		reloadAll: isDev,
	},
})

module.exports = {
	threadLoader,
	postCssLoader,
	cssLoader,
	scssLoader,
	babelLoader,
	fileLoader,
	imageLoader,
	imageOptimizeLoader,
	fontLoader,
	htmlLoader,
	extractCssPlugin,
}
