import React from 'react'
import { storiesOf } from '@storybook/react'

import { Button } from './'

storiesOf('Atoms/Button', module)
	.add('default', () => <Button>default</Button>)
	.add('primary', () => <Button modifier='primary'>primary</Button>)
	.add('secondary', () => <Button modifier='secondary'>secondary</Button>)
