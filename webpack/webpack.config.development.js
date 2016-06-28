var combineLoaders = require('webpack-combine-loaders')
var htmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

module.exports = {

  devtool: 'eval-source-map',

  entry: {

    bundle: [
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: "[name].js",
    publicPath: './'
  },

  plugins: [

    new webpack.optimize.UglifyJsPlugin({minimize: false}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.ProvidePlugin({
      _: 'underscore',
      jQuery: 'jquery',
      $: 'jquery'
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),

    new htmlWebpackPlugin({
      viewer3D: '/resources/libs/lmv/viewer3D.min.js',
      template: './layout/index.ejs',
      title: 'LMV-React | DEV',
      bundle: 'bundle.js',
      minify: false,
      inject: false
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: [
      path.resolve('./src/shared'),
      path.resolve('./src/shared/utils'),
      path.resolve('./src/shared/redux'),
      path.resolve('./src/shared/Components')
    ]
  },

  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: combineLoaders([{
          loader: 'react-hot'
        }, {
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'stage-0', 'react']
          }
        }])
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  }
}
