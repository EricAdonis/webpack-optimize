import { RuleSetLoader } from 'webpack'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import globImporter from 'node-sass-glob-importer'

export const threadLoader = (): RuleSetLoader => ({
	loader: 'thread-loader',
	options: {
		workers: require('os').cpus().length,
		workerParallelJobs: 50,
		workerNodeArgs: ['--max-old-space-size=2048'],
		poolParallelJobs: 500,
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
		implementation: require('node-sass'),
		sassOptions: {
			importer: globImporter(),
		},
		// implementation: require('sass'),
	},
})

export const babelLoader = ({ isDev }: { isDev: boolean }): RuleSetLoader => ({
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

export const extractCssPlugin = ({
	isDev,
}: {
	isDev: boolean
}): RuleSetLoader => ({
	loader: MiniCssExtractPlugin.loader,
	options: {
		hmr: isDev,
		reloadAll: isDev,
	},
})

export const docGenTSLoader = (): RuleSetLoader => ({
	loader: 'react-docgen-typescript-loader',
	options: {
		// tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
	},
})

export const styleLoader = (): RuleSetLoader => ({
	loader: 'style-loader',
})

export const cacheLoader = (): RuleSetLoader => ({
	loader: 'cache-loader',
})
