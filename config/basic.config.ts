import path from 'path'
import { Configuration } from 'webpack'

import { optimization } from './optimization.config'
import { optimizePlugins } from './plugins.config'
import { resolve } from './resolve.alias.config'
import {
	cssLoader,
	scssLoader,
	postCssLoader,
	babelLoader,
	imageLoader,
	imageOptimizeLoader,
	fontLoader,
	htmlLoader,
	threadLoader,
	extractCssPlugin,
} from './loader.config'

export interface IBasicConfig {
	isDev: boolean
}

export const basicConfig = ({ isDev }: IBasicConfig): Configuration => ({
	cache: true,
	mode: isDev ? 'development' : 'production',
	entry: [
		...(isDev
			? [
					'react-hot-loader/patch',
					'webpack-hot-middleware/client?path=/__webpack_hmr',
			  ]
			: []),
		path.resolve(__dirname, '../src/assets/scss/index.scss'),
		path.resolve(__dirname, '../src/index.tsx'),
	],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'static/js/[name].[hash].js',
		chunkFilename: 'static/js/chunk/[id].[contenthash].chunk.js',
		publicPath: '/',
	},
	optimization: optimization(),
	plugins: optimizePlugins({ isDev }),
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '*'],
		alias: {
			...resolve().alias,
			'react-dom': isDev ? '@hot-loader/react-dom' : 'react-dom',
		},
	},
	performance: {
		hints: false,
	},
	node: {
		module: 'empty',
		dgram: 'empty',
		dns: 'mock',
		fs: 'empty',
		http2: 'empty',
		net: 'empty',
		tls: 'empty',
	},
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.css$/,
						sideEffects: true,
						use: [
							extractCssPlugin({ isDev }),
							cssLoader(),
							postCssLoader(),
							threadLoader(),
						],
					},
					{
						test: /\.(scss|sass)$/,
						sideEffects: true,
						use: [
							extractCssPlugin({ isDev }),
							cssLoader(),
							postCssLoader(),
							scssLoader(),
							threadLoader(),
						],
					},
				],
			},
			{
				test: /\.(js|jsx|ts|tsx)/,
				exclude: /(node_modules)/,
				use: [babelLoader({ isDev }), threadLoader()],
			},
			{
				test: /\.(svg|png|jpe?g|gif)$/,
				use: [imageLoader(), imageOptimizeLoader(), threadLoader()],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [fontLoader(), threadLoader()],
			},
			{
				test: /\.html$/,
				use: [htmlLoader(), threadLoader()],
			},
		],
	},
})
