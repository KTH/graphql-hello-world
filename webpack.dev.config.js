const webpackProd = require('./webpack.config')
const webpack = require('webpack')

module.exports = {
  ...webpackProd,
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    webpackProd.entry
  ],
  mode: 'development',
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
