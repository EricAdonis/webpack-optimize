/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./index.d.ts" />
import path from 'path'
import webpack, { Plugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import WebpackBar from 'webpackbar'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import AutoDllPlugin from 'autodll-webpack-plugin'

export interface IPlugin {
	isDev: boolean
}

export const defaultPlugin = ({ isDev }: IPlugin): Partial<Plugin[]> => [
	new webpack.optimize.MinChunkSizePlugin({
		minChunkSize: 512,
	}),
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, '../public/index.html'),
		inject: true,
	}),
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin({
		filename: isDev ? 'static/css/[name].css' : 'static/css/[name].[hash].css',
		chunkFilename: isDev
			? 'static/css/chunk/[id].chunk.css'
			: 'static/css/chunk/[id].[contenthash].chunk.css',
		ignoreOrder: false,
	}),
	new ForkTsCheckerWebpackPlugin(),
	new WebpackBar(),
	new HardSourceWebpackPlugin(),
]

export const optimizePlugins = ({ isDev }: IPlugin): Plugin[] => [
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
