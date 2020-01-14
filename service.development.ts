import fastify from 'fastify'
import HMR from 'fastify-webpack-hmr'

import { basicConfig } from './config/basic.config'

const service = () => {
	const app = fastify({ logger: false })
	app.register(HMR, {
		config: basicConfig({
			isDev: true,
		}),
	})
	app.listen(10000)
}

service()
