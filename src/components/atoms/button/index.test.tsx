import React from 'react'
import { mount } from 'enzyme'

import { Button } from '@components/atoms/button'

describe('<Button />', () => {
	it('should be render', () => {
		expect(mount(<Button>Button</Button>)).toBeTruthy()
	})
})
