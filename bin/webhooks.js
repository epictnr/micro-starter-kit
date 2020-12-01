const { webhooksMaster } = require('../app/webhooks')
const { metrics } = require('../app/metrics')
const logger = require('../app/logger')
const config = require('../app/config')

logger.info(`Initial parameters:`)
logger.info(`- webHooks send: ${config.webHooks.enable ? 'on' : 'off'}`)
logger.info(`- devMode: ${config.devMode ? 'on' : 'off'}`)
logger.info(`- logger level: ${config.logger.level}`)

const server = async () => {
  webhooksMaster.start()
  metrics.start(config.applicationName || 'webhooks')

  process.on('SIGTERM', () => {
    webhooksMaster.stop()
    metrics.stop()
  })
}

server()
