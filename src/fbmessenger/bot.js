'use strict'

const dotenv = require('dotenv')
dotenv.config()

const request = require('request-promise-native')

module.exports = {
  main: (event, _, callback) => {
    let rawFBData = {}
    // just to be save
    try { rawFBData = JSON.parse(event.body) } catch (error) { console.error('failure parsing event body', error) }
    // check if the event was concering a facebook page subscription
    if (rawFBData.object !== 'page') return callback(null, {statusCode: 400, data: `Cannot handle subscriptions other than 'page': ${rawFBData.object}`})
    // immediately report back to facebook
    callback(null, {statusCode: 204})
    // iterate over entry
    rawFBData.entry.forEach(entry => {
      // iterate over the raw messaging events
      entry.messaging.forEach(input => {
        // TODO: Replace with your own logic
        // just echo the originale message
        request({
          uri: `https://graph.facebook.com/v2.8/me/messages`,
          method: 'POST',
          qs: {
            access_token: process.env.FB_PAGE_ACCESS_TOKEN
          },
          json: {
            recipient: {
              id: input.sender.id
            },
            message: {
              text: `echo: ${input.message.text}`
            }
          }
        })
        .catch(error => console.error('failure sending message:', error))
      })
    })
  },
  verify: (event, _, callback) => {
    const query = event.queryStringParameters
    // check for existing challenge and verify token is matching
    if (query['hub.challenge'] && query['hub.verify_token'] === process.env.FB_MESSENGER_VERIFICATION_TOKEN) {
      return callback(null, {
        statusCode: 200,
        body: query['hub.challenge']
      })
    }
    // reject
    callback(null, {
      statusCode: 401,
      body: 'Failed verification. Make sure the verify_token matches and a challenge is given.'
    })
  }
}
