const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const helpers = require('@epictnr/express-helper')

const { router } = require('../app/routes')
const logger = require('../app/logger')
const { metrics } = require('../app/metrics')
const { eventBus } = require('../app/webhooks')
const config = require('../app/config')

const app = express()

logger.info(`API Initial parameters:`)
logger.info(`- devMode: ${config.devMode ? 'on' : 'off'}`)
logger.info(`- logger level: ${config.logger.level}`)

const server = async () => {
  const port = process.env.SERVER_PORT || 80

  app.use(bodyParser.json({ type: 'application/*', 'limit': '5mb', verify: helpers.captureRawBody }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))

  app.use('/', router)
  app.use('/', metrics.getMasterRouter())
  app.use('/schema', express.static(path.join(__dirname, '/../public/schema')))

  app.use(helpers.createErrorHandler(logger))
  app.use(helpers.createNotFoundHandler())

  app.listen(port)

  logger.info(`HTTP server start and listen :${port} port`)
  metrics.startMaster('api')

  process.on('SIGTERM', () => {
    eventBus.stop()
    metrics.stop()
  })
}

eventBus.start('api')

server()
