const { createLogger } = require('@epictnr/logger')
const config = require('../config')

const init = () => {
  const logger = createLogger(config.logger)

  return logger
}

module.exports = init()
