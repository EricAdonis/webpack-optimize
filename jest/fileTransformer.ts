import path from 'path'

export default {
	process(_src: any, filename: string, _config: any, _options: any) {
		return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'
	},
}
