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
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const root = path.join(__dirname, '../')
const srcDir = 'src'
const outputDir = 'dist/development/assets/scripts'
const port = process.env.PORT || 3000

const webpackEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development'),
    'HMR': JSON.stringify(true),
    'ASSETS': JSON.stringify(`http://localhost:${port}`)
  }
})
const browserSyncPlugin = new BrowserSyncPlugin(
  {
    host: 'localhost',
    port: port + 1,
    proxy: `http://localhost:${port}/` // Proxy to the HMR server
  },
  { reload: false } // Let HMR do the reloading
)



/**
 * Export hmr (npm start) config
 */

module.exports = {
  // debug: true,
  devtool: 'eval',

  context: root,

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}`, // HMR only
    'webpack/hot/only-dev-server',
    `./${srcDir}/scripts/index.js`
  ],

  output: {
    path: path.join(root, outputDir), // Unused in HMR, but required by config
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  resolve: {
    extensions: ['', '.js']
  },

  module: {
    loaders: [
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
        test: /\.(png|jpg|gif|svg|woff2|ttf)$/,
        loader: 'url-loader',
        include: [ path.join(root, srcDir, 'images'), path.join(root, srcDir, 'fonts') ]
      }
    ]
  },

  plugins: [ webpackEnv, new webpack.HotModuleReplacementPlugin(), browserSyncPlugin ], // HMR only

  devServer: { // HMR only
    colors: true,
    historyApiFallback: true,
    inline: true,
    port: port,
    hot: true,
    contentBase: `./${srcDir}`
  }
}
