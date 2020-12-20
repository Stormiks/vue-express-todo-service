const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: '../server/views',
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: true,
  productionSourceMap: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          oneOf: [
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader']
            },
            {
              use: ['raw-loader', 'pug-plain-loader']
            }
          ]
        }
      ]
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve('src')) 
  },
  devServer: {
    historyApiFallback: true,
    proxy: 'http://localhost:8081'
  }
}