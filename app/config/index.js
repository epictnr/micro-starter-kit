const init = () => {
  return {
    applicationName: process.env.APPLICATION_NAME,
    devMode: !!parseInt(process.env.DEV_MODE),
    serviceId: '###PROJECT_NAME###',
    logger: {
      level: process.env.LOGGER_LEVEL || 'warn',
      format: process.env.LOGGER_FORMAT || 'default',
      environment: parseInt(process.env.DEV_MODE) ? '' : 'development',
    },
    postgresql: {
      connectionString: process.env.DATABASE_URL,
    },
    webHooks: {
      enable: !!parseInt(process.env.WEB_HOOK_ENABLE),
      masterHost: process.env.WEB_HOOK_HOST,
      masterPort: 8000,
      initiatorServiceId: '###PROJECT_NAME###',
      sendEventsInterval: '5 second',
      bigServiceClientRequestedEndpoint: 'test.dev/events',
    },
    metrics: {
      port: 8080,
      aggregateHosts: [
        '###PROJECT_NAME###-webhooks',
      ],
      collectDefaultMetricsInterval: 5000, // ms
    },
    cron: {
      test: {
        enable: !!parseInt(process.env.CRON_TEST_ENABLE),
        moment: (process.env.CRON_TEST_MOMENT || '').split('_').join(' '),
      },
    },
  }
}

module.exports = init()
