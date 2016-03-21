var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  devtool: 'cheap-module-eval-source-map',

  entry: {

    bundle: [
      'webpack-hot-middleware/client',
      './src/client/index.js'
    ]
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: "[name].js",
    publicPath: '/'
  },

  plugins: [

    new webpack.optimize.UglifyJsPlugin({minimize: false}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.ProvidePlugin({
      _ : "underscore",
      jQuery: "jquery",
      $: "jquery"
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),

    new htmlWebpackPlugin({
      viewer3D: 'libs/lmv/viewer3D.js',
      template: './layout/index.ejs',
      title: 'Viewer | DEV',
      bundle: 'bundle.js',
      minify: false,
      inject: false
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    root: [
      path.resolve('./src/shared'),
      path.resolve('./src/shared/redux'),
      path.resolve('./src/shared/Components')
    ]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        exclude: /node_modules/
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
}
