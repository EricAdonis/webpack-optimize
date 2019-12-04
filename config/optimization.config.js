/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require('terser-webpack-plugin')

const optimization = () => ({
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
	minimizer: [
		new TerserPlugin({
			cache: true,
			parallel: true,
			terserOptions: {
				parse: { ecma: 8 },
				compress: { ecma: 5 },
				output: { ecma: 5 },
			},
		}),
	],
	minimize: true,
})

module.exports = { optimization }
