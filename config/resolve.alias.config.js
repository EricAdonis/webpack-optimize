/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const resolve = () => ({
	alias: {
		'@src': path.resolve(__dirname, '../src'),
		'@components': path.resolve(__dirname, '../src/components'),
		'@libs': path.resolve(__dirname, '../src/libs'),
		'@configs': path.resolve(__dirname, '../src/configs'),
		'@pages': path.resolve(__dirname, '../src/pages'),
		'@assets': path.resolve(__dirname, '../src/assets'),
		'@utils': path.resolve(__dirname, '../src/utils'),
	},
})

module.exports = { resolve }
