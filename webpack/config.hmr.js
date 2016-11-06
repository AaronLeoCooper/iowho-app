/**
 * HMR (Hot Module Replacement)
 *
 * IMPORTANT: No files are outputted using HMR!!
 * This build is optimised to fully utilize Webpack's
 * HMR using webpack-dev-server. All file changes are
 * stored and retrieved from memory for fast development
 */

const path = require('path')
const webpack = require('webpack')

const root = path.join(__dirname, '../')
const srcDir = 'src'
const outputDir = 'dist/development/assets/scripts'

const webpackEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development'),
    'HMR': JSON.stringify(true),
    'ASSETS': JSON.stringify('http://localhost:3000')
  }
})



/**
 * Export hmr (npm start) config
 */

module.exports = {
  // debug: true,
  devtool: 'eval',

  context: root,

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000', // HMR only
    'webpack/hot/only-dev-server',
    `./${srcDir}/scripts/index.js`
  ],

  output: {
    path: path.join(root, outputDir),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  resolve: {
    extensions: ['', '.json', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: [ path.join(root, srcDir, 'json'), path.join(root, 'node_modules/moment-timezone/data/packed') ]
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: [ path.join(root, srcDir, 'scripts') ]
      },
      { // HMR only:
        test: /\.scss$/,
        loader: 'style!css?sourceMap!sass?sourceMap',
        include: [ path.join(root, srcDir, 'styles') ]
      },
      { // HMR only:
        test: /\.(png|jpg|gif|woff2)$/,
        loader: 'url-loader',
        include: [ path.join(root, srcDir, 'images'), path.join(root, srcDir, 'fonts') ]
      }
    ]
  },

  plugins: [ webpackEnv, new webpack.HotModuleReplacementPlugin() ], // HMR only

  devServer: { // HMR only
    colors: true,
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    contentBase: `./${srcDir}`
  }
}
