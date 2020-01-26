import React from 'react'
import { storiesOf } from '@storybook/react'

import { Button } from './'

storiesOf('Atoms/Button', module)
	.add('default', () => <Button>default</Button>)
	.add('default disable', () => <Button disable>default disable</Button>)
	.add('primary', () => <Button modifier='primary'>primary</Button>)
	.add('primary disable', () => (
		<Button modifier='primary' disable>
			primary disable
		</Button>
	))
	.add('secondary', () => <Button modifier='secondary'>secondary</Button>)
	.add('secondary disable', () => (
		<Button modifier='secondary' disable>
			secondary disable
		</Button>
	))
