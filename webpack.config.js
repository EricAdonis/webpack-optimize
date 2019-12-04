/* eslint-disable @typescript-eslint/no-var-requires */
const isDev = process.env.NODE_ENV === 'development'
const { basicConfig } = require('./config/basic.config')

module.exports = basicConfig({ isDev, ...process.env })
