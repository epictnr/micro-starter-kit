const pg = require('pg')
const config = require('../config')

const pool = new pg.Pool({
  connectionString: config.postgresql.connectionString,
})

module.exports = {
  query: (query, params) => pool.query(query, params),
  getPool: () => pool,
}
