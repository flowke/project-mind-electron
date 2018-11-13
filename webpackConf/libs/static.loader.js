const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = () => {
  const cssLoaderMap = new Map([
    [/\.css$/, 'css-loader'],
    [/\.s(c|a)ss$/, 'sass-loader'],
    [/\.less$/, 'less-loader']
  ])

  const mediaMap = [
    /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    /\.(woff2?|eot|ttf|otf)(\?.*)?$/
  ]

  const createCssLoader = function ([test, loader]) {
    const use = ['css-loader']
    
    if (loader !== 'css-loader') use.push(loader)

    if (isDev) {
      use.unshift('style-loader')
    } else {
      
      use.unshift(MiniCssExtractPlugin.loader)
    }

    return { test, use }
  }

  const mediaLoader = function (test) {
    return {
      test,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/[name]-[hash:7].[ext]'
      }
    }
  }

  return [
    ...mediaMap.map(test => mediaLoader(test)),
    ...[...cssLoaderMap].map(item => createCssLoader(item))
  ]
}
