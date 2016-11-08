/**
 * Dev Server
 *
 * This runs a local server with webpack's HMR (Hot Module Replacement)
 * enabled to speed up development
 * Serves to: localhost:3000/webpack-dev-server/src
 */

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack/config.hmr')
const port = process.env.PORT || 3000

new WebpackDevServer(webpack(config), {
  colors: true,
  historyApiFallback: true,
  port: port,
  hot: true,
  publicPath: config.output.publicPath
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening at localhost:${port}, go to: http://localhost:${port}/webpack-dev-server/dist/development/index.html`)
})
