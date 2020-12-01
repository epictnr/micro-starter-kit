const config = require('../config')

const clients = {
  getClients () {
    return [
      {
        'id': 1,
        'service': 'big-service',
        'events': [
          'event_requested',
        ],
        'endpoint': config.webHooks.bigServiceClientRequestedEndpoint,
      },
    ]
  },
}

module.exports = clients
