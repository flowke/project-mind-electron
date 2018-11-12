const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const baseLoaders = require('./libs/static.loader.js')
const CopyFile = require('copy-webpack-plugin');
const {paths} = require('../devConfig.js');
const pathTool = require('../utils/pathTool.js');


const nodeEnv = process.env.NODE_ENV || 'production'

const config = {
  context: pathTool.rootTo(),
  devtool: '#cheap-module-source-map',
  mode: nodeEnv,
  target: 'web',
  output: {
    path: pathTool.rootTo('public'),
    publicPath: '/',
  },
  performance: {
    hints: false
  },
  resolve: {

  },
  module: {

    rules: [

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          /(node_modules)/,
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      ...baseLoaders()
    ]
  },
  plugins: [

  ]
}

module.exports = config
