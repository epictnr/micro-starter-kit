const { Metrics } = require('@epictnr/metrics')
const logger = require('../logger')
const config = require('../config')

const params = {
  port: config.metrics.port,
  collectDefaultMetricsInterval: config.metrics.collectDefaultMetricsInterval,
  aggregateHosts: config.metrics.aggregateHosts,
  aggregateTimeout: 2 * 1000,
  serviceName: config.serviceId,
}

module.exports = new Metrics(params, logger)
