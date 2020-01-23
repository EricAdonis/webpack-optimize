const { addParameters, addDecorator, configure } = require('@storybook/react')
const {
	DEFAULT_VIEWPORT,
	INITIAL_VIEWPORTS,
	MINIMAL_VIEWPORTS,
} = require('@storybook/addon-viewport')
const { withInfo } = require('@storybook/addon-info')

if (process.env.NODE_ENV === 'test') {
	const registerRequireContextHook = require('babel-plugin-require-context-hook/register')
	registerRequireContextHook()
	const req = global.__requireContext(
		__dirname,
		'../src/components',
		true,
		/\.stories\.tsx$/
	)
	function loadStories() {
		req.keys().forEach(filename => req(filename))
	}
	configure(loadStories, module)
}

addParameters({
	viewport: {
		viewports: {
			DEFAULT_VIEWPORT,
			...INITIAL_VIEWPORTS,
			...MINIMAL_VIEWPORTS,
		},
	},
})

addDecorator(withInfo({ header: false, inline: true, source: true }))
