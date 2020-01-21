import { addParameters, addDecorator } from '@storybook/react'
import {
	DEFAULT_VIEWPORT,
	INITIAL_VIEWPORTS,
	MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport'
import { withInfo } from '@storybook/addon-info'

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
