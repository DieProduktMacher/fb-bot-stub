'use strict'

const Dotenv = require('dotenv-webpack')

// Entry and output are set by the plugin
module.exports = {
  target: 'node',
  externals: [
    /aws-sdk/ // Available on AWS Lambda
  ],
  module: {
    rules: [
      // Babel, Typescript…
    ]
  },
  plugins: [
    new Dotenv()
  ]
}
