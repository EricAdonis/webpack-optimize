import React from 'react'
import { storiesOf } from '@storybook/react'

import { Button } from './'

storiesOf('Atoms/Button', module)
	.add('default', () => <Button>default</Button>)
	.add('with Disable', () => <Button disable>default</Button>)
