/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import sass from 'node-sass'
import path from 'path'
import glob from 'glob'

const fastSassLoader = function(content: string) {
	var callback = this.async()
	const { resourcePath } = this
	if (path.basename(resourcePath) !== 'index.scss') {
		callback(null, '')
		return
	}

	const dirName = path.dirname(resourcePath)
	let scss = content
	const pathGlobs = content.match(/^@import.+\*.scss.;/gmu)
	if (pathGlobs) {
		pathGlobs.map(pathGlob => {
			const trimPathGlob = pathGlob
				.match(/'.+'/g)[0]
				.slice(1)
				.slice(0, -1)
			const paths = glob
				.sync(path.resolve(dirName, trimPathGlob))
				.reduce((str, path) => `@import '${str + path}';\n`, '')
			scss = scss.replace(pathGlob, paths)
		})
	}
	const { css } = sass.renderSync({
		indentedSyntax: true,
		outputStyle: 'compressed',
		sourceMap: false,
		data: scss,
		file: resourcePath,
	})
	// console.log(css.toString())
	callback(null, css.toString())
	return
}

export default fastSassLoader
