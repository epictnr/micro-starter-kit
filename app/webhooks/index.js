const epictnrWebhooks = require('@epictnr/webhooks')
const clients = require('./clients')
const logger = require('../logger')
const config = require('../config')

const webhooksConfig = {
  params: config.webHooks,
  logger: logger,
}

const eventBus = epictnrWebhooks.eventBus(webhooksConfig)

const webhooksMaster = epictnrWebhooks.webhooksMaster(webhooksConfig)
webhooksMaster.setClients(clients.getClients())

module.exports = {
  eventBus,
  webhooksMaster,
}
