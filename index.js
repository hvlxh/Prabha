const { default: Logger } = require('./dist/node')

if (typeof process !== "undefined") {
  module.exports = Logger
} else {
  throw new Error('Please use "prabha/dist/broswer.js for broswer version"')
}