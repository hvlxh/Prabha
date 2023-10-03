const { Logger } = require('prabha')
const logger = new Logger('modern');

['info', 'warn', 'error', 'debug'].forEach((v) => {
  logger[v]('Test')
})