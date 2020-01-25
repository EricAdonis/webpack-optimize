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
	docGenTSLoader,
	styleLoader,
	cacheLoader,
} from './loader.config'

export interface IBasicConfig {
	isDev: boolean
	isStories?: boolean
}

export const basicConfig = ({
	isDev,
	isStories,
}: IBasicConfig): Configuration => ({
	cache: true,
	mode: isDev ? 'development' : 'production',
	entry: [
		...(isDev
			? [
					'react-hot-loader/patch',
					'webpack-hot-middleware/client?path=/__webpack_hmr',
			  ]
			: []),
		path.resolve(__dirname, '../src/index.tsx'),
	],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'static/js/[name].[hash].js',
		chunkFilename: 'static/js/chunk/[id].[contenthash].chunk.js',
		publicPath: '/',
	},
	optimization: optimization({ isDev }),
	plugins: optimizePlugins({ isDev, isStories }),
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
							cacheLoader(),
							...(isStories ? [styleLoader()] : [extractCssPlugin({ isDev })]),
							cssLoader(),
							postCssLoader(),
						],
					},
					{
						test: /\.(scss|sass)$/,
						sideEffects: true,
						use: [
							cacheLoader(),
							...(isStories ? [styleLoader()] : [extractCssPlugin({ isDev })]),
							cssLoader(),
							postCssLoader(),
							scssLoader(),
						],
					},
				],
			},
			{
				test: /\.(ts|tsx)/,
				exclude: /(node_modules)/,
				use: [
					cacheLoader(),
					threadLoader(),
					babelLoader({ isDev }),
					...(isStories ? [docGenTSLoader()] : []),
				],
			},
			{
				test: /\.(js|jsx)/,
				exclude: /(node_modules)/,
				use: [cacheLoader(), babelLoader({ isDev })],
			},
			{
				test: /\.(svg|png|jpe?g|gif)$/,
				use: [
					cacheLoader(),
					threadLoader(),
					imageLoader(),
					...(isDev ? [] : [imageOptimizeLoader()]),
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [cacheLoader(), threadLoader(), fontLoader()],
			},
			{
				test: /\.html$/,
				use: [cacheLoader(), threadLoader(), htmlLoader()],
			},
		],
	},
})
