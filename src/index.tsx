import React from 'react'
import { render } from 'react-dom'

import '@assets/scss/index.scss'
import(/* webpackPrefetch: true */ '@src/app').then(App => {
	render(<App.default />, document.querySelector('#root'))
})
