process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const CronJob = require('cron').CronJob
const { metrics } = require('../app/metrics')
const { eventBus } = require('../app/webhooks')
const logger = require('../app/logger')
const config = require('../app/config')

const workerName = 'test-worker'
const cronSettings = config.cron.test

const executeWorker = async () => {
  console.log('test worker work')
}

const runWorker = async () => {
  logger.info(`[${workerName}] Initial parameters:`)
  logger.info(`- devMode: ${config.devMode ? 'on' : 'off'}`)
  logger.info(`- logger level: ${config.logger.level}`)
  logger.info(`- cron settings: ${cronSettings.enable ? 'on' : 'off'} | ${cronSettings.moment}`)

  let locked = !cronSettings.enable

  const cronJob = new CronJob(cronSettings.moment, async () => {
    if (!locked) {
      locked = true

      logger.info(`[${workerName}] Processing cron event start`)

      try {
        await executeWorker()
        logger.info(`[${workerName}] Processing succeeded`)
      } catch (error) {
        logger.error(`[${workerName}] Processing error: ${error.message}`)
      }

      if (process.env.NODE_ENV === 'production') {
        locked = false
      } else {
        locked = true
        logger.warn(`[${workerName}] Cron disabled in development mode`)
      }
    }
  })

  eventBus.start(workerName)
  metrics.start(config.applicationName || workerName)
  cronJob.start()

  process.on('SIGTERM', () => {
    eventBus.stop()
    metrics.stop()
  })
}

runWorker()
