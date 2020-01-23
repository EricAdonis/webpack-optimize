import TerserPlugin from 'terser-webpack-plugin'
import { Options } from 'webpack'

export const optimization = ({
	isDev,
}: {
	isDev: boolean
}): Options.Optimization => ({
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
	...(isDev
		? {}
		: {
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
		  }),
})
