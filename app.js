const server = require('./server')
const port = process.env.PORT || 3001
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.config.js')
const compiler = webpack(webpackConfig)

server.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath
}))
server.use(require('webpack-hot-middleware')(compiler))

server.listen(port, async () => {
  console.log(`Started server in port ${port}`)
})
