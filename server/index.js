const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const graphqlServer = require('./graphql')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/', (req, res) => {
  res.cookie('courseId', req.query.canvasCourseId)
  res.cookie('canvasToken', req.accessToken)
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
