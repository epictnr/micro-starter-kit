const router = require('express-promise-router')()

router.get('/system/health', (request, response) => {
  response.json({'current_unix_timestamp': Math.floor(Date.now() / 1000)})
})

module.exports = router
