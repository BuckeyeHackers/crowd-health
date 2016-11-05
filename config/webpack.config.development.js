const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'eval',
  noInfo: true,
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  entry: [
    'whatwg-fetch',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001/',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../client/index'),
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../client'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        babelrc: false,
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'react-hot-loader/babel'],
          presets: ['react', 'latest', 'stage-0'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.ico$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /(\.css|\.scss)$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
    ],
  },
  postcss: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      isDev: process.env.NODE_ENV === 'development',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../client/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
  ],
};
