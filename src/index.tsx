import React from 'react'
import { render } from 'react-dom'

import(/* webpackPrefetch: true */ '@src/app').then(App => {
	render(<App.default />, document.querySelector('#root'))
})
