const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join, resolve } = require('path')
const merge = require('webpack-merge')
const CopyFile = require('copy-webpack-plugin')
const NotifierPlugin = require('webpack-notifier')
const IncludeAssets = require('html-webpack-include-assets-plugin')
const paths = require('./path');
const devConfig = require('../devConfig.js');
const baseConfig = require('./config.base.js')


const nodeEnv = process.env.NODE_ENV || 'development'


let {
  entry: entries
} = devConfig;

let entryKeys = Object.keys(entries);

module.exports = entryKeys.map(name=>{
  return merge(baseConfig, {
    entry: [entries[name]],
    output: {
      filename: `${name}.js`
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    stats: 'minimal',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: paths.tmpl(`${name}.html`),
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
        alwaysNotify: false

      })
    ],

  })
})




