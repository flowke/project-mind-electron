const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join, resolve } = require('path')
const merge = require('webpack-merge')
const CopyFile = require('copy-webpack-plugin')
const NotifierPlugin = require('webpack-notifier')
const IncludeAssets = require('html-webpack-include-assets-plugin')
const paths = require('./path');

const nodeEnv = process.env.NODE_ENV || 'development'

const baseConfig = require('./base.js')

console.log(`当前环境变量 ======> ${nodeEnv}`)


const config = merge(baseConfig, {
  entry: [
    paths.src('index.js'),
  ],
  output: {
    filename: '[name].js'
  },
  mode: 'development',
  // devtool: 'source-map',

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.tmpl('index.html'),
    }),
    new CopyFile([
      {
        from: `node_modules/react/umd/react.development.js`
      },
      {
        from: `node_modules/react-dom/umd/react-dom.development.js`
      }
    ]),
    new IncludeAssets({
      assets: [
        'react.development.js',
        'react-dom.development.js'
      ],
      append: false,
      hash: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    new NotifierPlugin({
      title: '编译完成...',


    })
  ],

})

module.exports = config
