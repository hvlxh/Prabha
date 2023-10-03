const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './dist/node.js',
  output: {
    filename: 'browser.js',
    library: "prabha",
    libraryTarget: 'umd',
    globalObject: 'this',
  },

  plugins: [new MomentLocalesPlugin()]
};
