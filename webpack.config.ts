import { basicConfig } from './config/basic.config'

const defaultConfig = basicConfig({
	isDev: process.env.NODE_ENV === 'development',
})

export default defaultConfig
