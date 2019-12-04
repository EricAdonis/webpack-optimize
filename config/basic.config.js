/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const {
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
} = require('./loader.config')
const { optimization } = require('./optimization.config')
const { resolve } = require('./resolve.alias.config')
const { optimizePlugins } = require('./plugins.config')

const basicConfig = ({ isDev, PORT, isDevFast }) => ({
	cache: true,
	mode: isDev ? 'development' : 'production',
	devtool: isDev ? 'cheap-module-eval-source-map' : '',
	entry: [
		path.resolve(__dirname, '../src/index.tsx'),
		path.resolve(__dirname, '../src/assets/scss/index.scss'),
		...(isDevFast ? ['webpack-hot-middleware/client?path=/__webpack_hmr'] : []),
	],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'static/js/[name].[hash].js',
		chunkFilename: 'static/js/chunk/[id].[contenthash].chunk.js',
		publicPath: '/',
	},
	devServer: {
		port: PORT || 10000,
		contentBase: path.resolve(__dirname, 'dist'),
		historyApiFallback: true,
		hot: true,
		hotOnly: true,
		compress: true,
		inline: true,
		noInfo: true,
		overlay: false,
		clientLogLevel: 'silent',
	},
	optimization: optimization(),
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '*'],
		alias: {
			...resolve().alias,
			'react-dom': '@hot-loader/react-dom',
		},
	},
	plugins: optimizePlugins({ isDev }),
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
		child_process: 'empty',
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
				use: [threadLoader(), babelLoader({ isDev })],
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

module.exports = { basicConfig }
