
process.env.NODE_ENV === 'production' ?
  module.exports = require('./Root.prod'):
  module.exports = require('./Root.dev');