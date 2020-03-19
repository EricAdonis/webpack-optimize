import path from 'path'
import webpack from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import WebpackBar from 'webpackbar'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import globImporter from 'node-sass-glob-importer'

const threadLoader = {
	loader: 'thread-loader',
	options: {
		workers: require('os').cpus().length,
		workerParallelJobs: 50,
		workerNodeArgs: ['--max-old-space-size=2048'],
		poolParallelJobs: 500,
	},
}

const babelLoader = {
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
		],
	},
}

export default {
	stories: ['../src/components/**/*.stories.tsx'],
	addons: [
		'@storybook/addon-knobs/register',
		'@storybook/addon-actions/register',
		'@storybook/addon-viewport/register',
	],
	webpackFinal: config => {
		return {
			...config,
			optimization: {
				...config.optimization,
				usedExports: true,
				moduleIds: 'hashed',
				runtimeChunk: 'single',
				splitChunks: {
					chunks: 'all',
					cacheGroups: {
						vendor: {
							test: /[\\/]node_modules[\\/]/,
							name: 'vendors',
							chunks: 'all',
						},
					},
					maxAsyncRequests: Infinity,
					maxInitialRequests: Infinity,
				},
			},
			plugins: [
				...config.plugins,
				new webpack.optimize.MinChunkSizePlugin({
					minChunkSize: 512,
				}),
				new ForkTsCheckerWebpackPlugin(),
				new WebpackBar(),
			],
			module: {
				rules: [
					{
						oneOf: [
							{
								test: /\.css$/,
								sideEffects: true,
								use: [
									{ loader: 'cache-loader' },
									{ loader: 'style-loader' },
									{ loader: 'css-loader' },
									{
										loader: 'postcss-loader',
										options: {
											ident: 'postcss',
											plugins: [autoprefixer(), cssnano()],
										},
									},
								],
							},
							{
								test: /\.(scss|sass)$/,
								sideEffects: true,
								use: [
									{ loader: 'cache-loader' },
									{ loader: 'style-loader' },
									{ loader: 'css-loader' },
									{
										loader: 'postcss-loader',
										options: {
											ident: 'postcss',
											plugins: [autoprefixer(), cssnano()],
										},
									},
									{
										loader: 'sass-loader',
										options: {
											implementation: require('node-sass'),
											sassOptions: {
												importer: globImporter(),
											},
											// implementation: require('sass'),
										},
									},
								],
							},
						],
					},
					{
						test: /\.(ts|tsx)/,
						exclude: /(node_modules)/,
						use: [
							{ loader: 'cache-loader' },
							threadLoader,
							babelLoader,
							{
								loader: 'react-docgen-typescript-loader',
							},
						],
					},
					{
						test: /\.(js|jsx)/,
						exclude: /(node_modules)/,
						use: [{ loader: 'cache-loader' }, threadLoader, babelLoader],
					},
					{
						test: /\.(svg|png|jpe?g|gif)$/,
						use: [
							{ loader: 'cache-loader' },
							threadLoader,
							{
								loader: 'file-loader',
								options: {
									outputPath: 'static/assets/images',
									name: '[name].[hash].[ext]',
								},
							},
						],
					},
					{
						test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
						use: [
							{ loader: 'cache-loader' },
							threadLoader,
							{
								loader: 'file-loader',
								options: {
									outputPath: 'static/assets/fonts',
									name: '[name].[hash].[ext]',
								},
							},
						],
					},
					{
						test: /\.html$/,
						use: [
							{ loader: 'cache-loader' },
							threadLoader,
							{
								loader: 'html-loader',
								options: {
									minimize: true,
								},
							},
						],
					},
				],
			},
			resolve: {
				...config.resolve,
				extensions: ['.ts', '.tsx', '.js', '.jsx', '*'],
				alias: {
					'@src': path.resolve(__dirname, '../src'),
					'@components': path.resolve(__dirname, '../src/components'),
					'@libs': path.resolve(__dirname, '../src/libs'),
					'@configs': path.resolve(__dirname, '../src/configs'),
					'@pages': path.resolve(__dirname, '../src/pages'),
					'@assets': path.resolve(__dirname, '../src/assets'),
					'@utils': path.resolve(__dirname, '../src/utils'),
				},
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
		}
	},
}
