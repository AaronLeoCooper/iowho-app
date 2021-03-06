/**
 * Build Webpack Config
 *
 * Outputs a build of the app to /build/development or build/production
 * (Dependant on NODE_ENV)
 */

const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production' || false

const path = require('path')
const webpack = require('webpack')

const root = path.join(__dirname, '../')
const srcDir = 'src'

const webpackDeDupe = new webpack.optimize.DedupePlugin()
const webpackOccuranceOrder = new webpack.optimize.OccurenceOrderPlugin()

const buildEnvs = {
  'process.env': {
    'NODE_ENV': JSON.stringify(env),
    'ASSETS': JSON.stringify('/assets')
  }
}
if (process.env.API_URL) buildEnvs['process.env']['API_URL'] = JSON.stringify(process.env.API_URL)

const webpackEnv = new webpack.DefinePlugin(buildEnvs)
const webpackMinify = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: true
  }
})

const plugins = isProduction
  ? [ webpackEnv, webpackDeDupe, webpackOccuranceOrder, webpackMinify ]
  : [ webpackEnv ]

const devtool = isProduction ? 'cheap-module-source-map' : 'eval'



/**
 * Export build config
 */

module.exports = function (outputDir, outName) {
  return {
    debug: false,
    devtool: devtool, // default: Production sourcemaps

    context: root, // default: up 1 directory from this file's location

    entry: `./${srcDir}/scripts/index.js`,

    resolve: {
      extensions: ['', '.js']
    },

    output: {
      path: outputDir,
      filename: outName || 'bundle.js',
      publicPath: '/assets/'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          include: [
            path.join(root, srcDir, 'scripts')
          ]
        }
      ]
    },

    plugins: plugins
  }
}
