/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const defaultPlugin = ({ isDev }) => [
	new webpack.optimize.MinChunkSizePlugin({
		minChunkSize: 512,
	}),
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, '../public/index.html'),
		inject: true,
	}),
	new CleanWebpackPlugin(),
	new WebpackBar(),
	new HardSourceWebpackPlugin(),
	new MiniCssExtractPlugin({
		filename: isDev ? 'static/css/[name].css' : 'static/css/[name].[hash].css',
		chunkFilename: isDev
			? 'static/css/chunk/[id].chunk.css'
			: 'static/css/chunk/[id].[contenthash].chunk.css',
		ignoreOrder: false,
	}),
	new ForkTsCheckerWebpackPlugin(),
]

const optimizePlugins = ({ isDev }) => [
	...defaultPlugin({ isDev }),
	...(isDev
		? [new webpack.HotModuleReplacementPlugin()]
		: [
				new OptimizeCSSAssetsPlugin({
					cssProcessor: require('cssnano'),
					cssProcessorOptions: {
						discardComments: {
							removeAll: true,
						},
					},
				}),
				new AutoDllPlugin({
					inject: true,
					filename: '[hash].dll.js',
					path: 'static/dll',
					entry: {
						vendor: ['react', 'react-dom', 'react-router-dom'],
					},
					plugins: [
						new webpack.optimize.MinChunkSizePlugin({
							minChunkSize: 512,
						}),
					],
				}),
		  ]),
]

module.exports = { optimizePlugins }
