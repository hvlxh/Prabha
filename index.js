const Prabha = require('./dist/node')

if (typeof process !== "undefined") {
  console.log(Prabha)
  module.exports = Prabha
} else {
  throw new Error('Please use "prabha/dist/broswer.js for broswer version"')
}