module.exports = {
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
	],
}
