const express = require('express')
const app = express()
const graphqlServer = require('./graphql')

app.get('/', (req, res) => {
  res.send(
    `<!DOCTYPE html>
     <html lang="en">
     <title>GraphQL Example</title>
     <div id="root"></div>
     <script src="static/index.js"></script>
  `)
})

graphqlServer.applyMiddleware({ app })

module.exports = app
